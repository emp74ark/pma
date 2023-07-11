import React, { FC, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactSortable, SortableEvent } from 'react-sortablejs';

import { openModal } from '../../redux/modalSlice';
import { setMaxHeight, toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { getBoardById } from '../../services/board.services';
import { editColumn, getAllColumns } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, ColumnData } from '../../shared/interfaces';
import { ItemActions } from '../../components/ItemActions/ItemAction';
import { motion } from 'framer-motion';

const ColumnItem = React.lazy(() => import('../../components/ColumnItem/ColumnItem'));

export const BoardPage: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boardId = params.boardId;
  const [boardData, setBoardData] = useState<Board>();
  const [columnData, setColumnData] = useState<ColumnData[]>([]);
  const { modal } = useSelector((state: RootState) => state);

  useEffect(() => {
    setColumnData([]);
    dispatch(toggleLoading(true));

    getAllColumns(boardId!).then((reposnse) => {
      if (reposnse.status === 200) {
        dispatch(toggleLoading(false));
      }
      reposnse.data.map((column) => {
        getAllTasks(boardId!, column.id!).then((tasks) => {
          const data: ColumnData = {
            id: column.id!,
            column: {
              ...column,
              boardId: boardId!,
            },
            tasks: tasks.data,
          };
          setColumnData((prev) =>
            [...prev, data].sort((a, b) => a.column.order! - b.column.order!)
          );
        });
      });
    });

    getBoardById(boardId!).then((response) => setBoardData(response.data));
  }, [modal]);

  const onSortEnd = ({ oldIndex, newIndex }: SortableEvent) => {
    editColumn({
      boardId: boardId,
      ...columnData[oldIndex!].column,
      order: newIndex! + 1,
    });
  };

  const addColumnHandler = () => {
    dispatch(openModal({ name: 'addColumn', data: { id: boardId, title: '' } }));
  };

  useEffect(() => {
    const containerHeight = document.querySelector('.columns')?.clientHeight;
    if (containerHeight) dispatch(setMaxHeight(containerHeight));
  }, [document.querySelector('.columns')?.clientHeight]);

  return (
    <Container fluid className="flex-fill d-flex flex-column mb-3">
      <ItemActions item="column" callback={addColumnHandler} />
      <div className="row d-flex justify-content-between m-2">
        <h2 className="col text-center">{boardData?.title}</h2>
      </div>
      <div className="row">
        <h5 className="col text-center text-secondary">{boardData?.description}</h5>
      </div>
      <ReactSortable
        list={columnData}
        setList={setColumnData}
        onEnd={onSortEnd}
        direction={'horizontal'}
        animation={200}
        delayOnTouchOnly={true}
        delay={0}
        ghostClass={'ghost'}
        className="columns flex-fill w-100 min-vh-80 d-flex gap-5 overflow-auto p-2"
      >
        {columnData.map((data) => (
          <motion.div key={data.column.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ColumnItem {...data} />
          </motion.div>
        ))}
      </ReactSortable>
    </Container>
  );
};
