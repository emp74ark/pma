import React, { FC } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { TasksList } from '../TasksList/TasksList';
import { Column, ColumnData } from '../../shared/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { EditColumn } from '../Modal/EditColumn';

export const ColumnItem: FC<ColumnData> = (data) => {
  const dispatch = useDispatch();
  const { modal, setting } = useSelector((state: RootState) => state);

  const editColumnHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'editColumn', data: column }));
  };

  const removeColumnHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(openModal({ name: 'removeColumn', data: column }));
  };

  const addTaskHandler = (e: React.MouseEvent, column: Column) => {
    e.stopPropagation();
    dispatch(
      openModal({
        name: 'addTask',
        data: { boardId: column.boardId, columnId: column.id, title: '' },
      })
    );
  };

  return (
    <Card
      className="flex-grow-0 flex-shrink-0"
      style={{ width: '20rem', height: 'fit-content' }}
      bg={setting.theme}
      text={setting.theme === 'dark' ? 'white' : 'dark'}
    >
      <Card.Header className="gap-3">
        <div className="row">
          {modal.visible.editColumn && modal.data?.id === data.column.id ? (
            <EditColumn />
          ) : (
            <Card.Title
              onClick={(e: React.MouseEvent) => editColumnHandler(e, data.column)}
              className="col"
            >
              {data.column.title}
            </Card.Title>
          )}

          <ButtonGroup className="col-4 float-right" size="sm">
            <Button
              className="bi-plus-circle text-primary"
              variant="link"
              onClick={(e) => addTaskHandler(e, data.column)}
            />
            <Button
              className="bi-trash text-danger"
              variant="link"
              onClick={(e) => removeColumnHandler(e, data.column)}
            />
          </ButtonGroup>
        </div>
      </Card.Header>
      <Card.Body
        style={{ maxHeight: `${setting.maxHeight - 52}px` }}
        className="d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto"
      >
        {<TasksList data={data} />}
      </Card.Body>
    </Card>
  );
};
