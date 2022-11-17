import { ListGroup } from 'react-bootstrap';
import { ColumnData } from '../../shared/interfaces';
import { TaskItem } from '../TaskItem/TaskItem';

export const TasksList = (props: { data: ColumnData }) => {
  const {
    data: { tasks },
  } = props;

  return (
    <ListGroup>
      {tasks.map((task) => (
        <TaskItem {...task} key={task.id} id={task.id} />
      ))}
    </ListGroup>
  );
};
