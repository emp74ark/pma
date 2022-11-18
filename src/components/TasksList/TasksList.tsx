import { ColumnData, Task } from '../../shared/interfaces';
import { TaskItem } from '../TaskItem/TaskItem';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { useState } from 'react';
import { createTask, deleteTask, editTask } from '../../services/task.service';

export const TasksList = (props: { data: ColumnData }) => {
  const { data } = props;
  const [tasks, setTasks] = useState<Task[]>(data.tasks.sort((a, b) => a.order! - b.order!));
  const onSortEnd = ({ to, oldIndex, newIndex }: SortableEvent) => {
    const task = tasks[oldIndex!];
    createTask({
      ...task,
      columnId: to.id,
    })
      .then((response) =>
        editTask({
          ...response.data,
          order: newIndex! + 1,
        })
      )
      .then((response) => {
        if (response.status === 200) deleteTask(task.boardId!, task.columnId!, task.id);
      });
    // deleteTask(task.boardId!, task.columnId!, task.id);
  };

  return (
    <ReactSortable
      list={tasks}
      setList={setTasks}
      onEnd={onSortEnd}
      animation={300}
      delayOnTouchOnly={true}
      delay={2}
      group="shared"
      className="list-group"
      id={data.id}
    >
      {tasks.map((task) => (
        <TaskItem {...task} key={task.id} />
      ))}
    </ReactSortable>
  );
};
