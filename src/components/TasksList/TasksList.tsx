import { ListGroup } from 'react-bootstrap';
import { ColumnData, Task } from '../../shared/interfaces';
import { TaskItem } from '../TaskItem/TaskItem';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { useEffect, useState } from 'react';
import { editTask } from '../../services/task.service';

export const TasksList = (props: { data: ColumnData }) => {
  const { data } = props;
  const [tasks, setTasks] = useState<Task[]>(data.tasks.sort((a, b) => a.order! - b.order!));
  const onSortEnd = ({ oldIndex, newIndex }: SortableEvent) => {
    editTask({
      ...tasks[oldIndex!],
      order: newIndex! + 1,
    });
  };

  useEffect(() => {
    console.log(tasks);
  }, []);

  return (
    <ListGroup>
      <ReactSortable list={tasks} setList={setTasks} onEnd={onSortEnd}>
        {tasks.map((task) => (
          <TaskItem {...task} key={task.id} />
        ))}
      </ReactSortable>
    </ListGroup>
  );
};
