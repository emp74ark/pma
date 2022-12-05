import { FC, MouseEvent } from 'react';
import { Task } from '../../shared/interfaces';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { openModal } from '../../redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TaskButtons } from './TaskItem.buttons';

export const TaskItem: FC<Task> = (task) => {
  const dispatch = useDispatch();
  const {
    users,
    setting: { theme },
  } = useSelector((state: RootState) => state);

  const buttonHandler = (e: MouseEvent, name: string, task: Task) => {
    e.stopPropagation();
    dispatch(openModal({ name, data: task }));
  };

  function defineName(userId: string) {
    const user = users.all.filter((user) => user.id === userId);
    if (user.length !== 0) {
      return user[0].login;
    }
    return 'unknown';
  }

  return (
    <ListGroup.Item
      variant={theme}
      className="w-100"
      onClick={(e) => buttonHandler(e, 'infoTask', task)}
    >
      <div className="row align-middle">
        <h6 className="col">{task.title}</h6>
        <ButtonGroup className="col float-right">
          {TaskButtons.map(({ name, icon }) => (
            <Button
              key={name}
              variant="secondary"
              size="sm"
              onClick={(e) => buttonHandler(e, name, task)}
            >
              <i className={icon} />
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="row p-2">{task.description}</div>
      <div className="row p-2">{defineName(task.userId)}</div>
    </ListGroup.Item>
  );
};
