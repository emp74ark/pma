import { FC, MouseEvent, lazy } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
const TasksList = lazy(() => import('../TasksList/TasksList'));
import { Column, ColumnData } from '../../shared/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { openModal } from '../../redux/modalSlice';
import { EditColumn } from '../EditColumn/EditColumn';
import { ColumnButtons } from './ColumnItem.buttons';

const ColumnItem: FC<ColumnData> = (columnData) => {
  const dispatch = useDispatch();
  const {
    modal: { visible, data },
    setting: { theme, maxHeight },
  } = useSelector((state: RootState) => state);

  const buttonHandler = (e: MouseEvent, name: string, column: Column) => {
    e.stopPropagation();
    const data =
      name === 'addTask' ? { boardId: column.boardId, columnId: column.id, title: '' } : column;
    dispatch(openModal({ name, data }));
  };

  return (
    <Card
      className="column-card flex-grow-0 flex-shrink-0 shadow-sm"
      bg={theme}
      text={theme === 'dark' ? 'white' : 'dark'}
    >
      <Card.Header className="gap-3">
        <div className="row">
          {visible.editColumn && data?.id === columnData.column.id ? (
            <EditColumn />
          ) : (
            <Card.Title
              onClick={(e: MouseEvent) => buttonHandler(e, 'editColumn', columnData.column)}
              className="col"
            >
              {columnData.column.title}
            </Card.Title>
          )}
          <ButtonGroup className="col-4 float-right" size="sm">
            {ColumnButtons.map(({ name, icon, color }) => (
              <Button
                key={name}
                className={`${icon} ${color}`}
                variant="link"
                onClick={(e) => buttonHandler(e, name, columnData.column)}
              />
            ))}
          </ButtonGroup>
        </div>
      </Card.Header>
      <Card.Body
        style={{ maxHeight: `${maxHeight - 100}px` }}
        className="d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto"
      >
        {<TasksList data={columnData} />}
      </Card.Body>
    </Card>
  );
};

export default ColumnItem;
