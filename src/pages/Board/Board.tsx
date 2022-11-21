import React, { FC, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactSortable, SortableEvent } from 'react-sortablejs';

import { openModal } from '../../redux/modalSlice';
import { toggleLoading } from '../../redux/settingsSlice';
import { RootState } from '../../redux/store';
import { getBoardById } from '../../services/board.services';
import { editColumn, getAllColumns } from '../../services/column.service';
import { getAllTasks } from '../../services/task.service';
import { Board, ColumnData } from '../../shared/interfaces';
import { ColumnItem } from '../../components/ColumnItem/ColumnItem';
import { useTranslation } from 'react-i18next';

export const BoardPage: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boardId = params.boardId;
  const [boardData, setBoardData] = useState<Board>();
  const [columnData, setColumnData] = useState<ColumnData[]>([]);
  const { modal } = useSelector((state: RootState) => state);
  const { t } = useTranslation();

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

  return (
    <Container fluid className="flex-fill">
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
            <span className="m-2">{t('board.addColumn')}</span>
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
        className="w-100 min-vh-80 d-flex gap-5 overflow-auto"
      >
        {columnData.map((data) => (
          <ColumnItem {...data} key={data.column.id} />
        ))}
      </ReactSortable>
    </Container>
  );
};
