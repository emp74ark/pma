import React, { FC, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactSortable, SortableEvent } from 'react-sortablejs';

import { openModal } from '../../redux/modalSlice';
import { setMaxHeight, toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { getBoardById } from '../../services/board.services';
import { editColumn, getAllColums } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, ColumnData } from '../../shared/interfaces';
import { ColumnItem } from '../../components/ColumnItem/ColumnItem';

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
    getAllColums(boardId!).then((reposnse) => {
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

  useEffect(() => {
    console.log('height', document.querySelector('.columns')?.clientHeight);
    if (document.querySelector('.columns')?.clientHeight)
      dispatch(setMaxHeight(document.querySelector('.columns')?.clientHeight as number));
  }, [document.querySelector('.columns')?.clientHeight]);

  return (
    <Container fluid className="flex-fill d-flex flex-column mb-3">
      <div className="row d-flex justify-content-between m-3">
        <h2 className="col-auto">{boardData?.title}</h2>
        <Button
          className="col-auto"
          variant="success"
          onClick={() =>
            dispatch(openModal({ name: 'addColumn', data: { id: boardId, title: '' } }))
          }
        >
          <i className="bi-plus-circle">
            <span className="m-2">Add column</span>
          </i>
        </Button>
      </div>
      <div className="row m-3">
        <h3 className="col text-center text-secondary">{boardData?.description}</h3>
      </div>
      <ReactSortable
        list={columnData}
        setList={setColumnData}
        onEnd={onSortEnd}
        direction={'horizontal'}
        animation={200}
        delayOnTouchOnly={true}
        delay={2}
        className="columns flex-fill w-100 min-vh-80 d-flex gap-5 overflow-auto"
      >
        {columnData.map((data) => (
          <ColumnItem {...data} key={data.column.id} />
        ))}
      </ReactSortable>
    </Container>
  );
};
