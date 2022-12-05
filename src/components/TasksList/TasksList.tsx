import { ColumnData, Task } from '../../shared/interfaces';
import { TaskItem } from '../TaskItem/TaskItem';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { useState } from 'react';
import { editTask, getTaskById } from '../../services/task.service';

const TasksList = (props: { data: ColumnData }) => {
  const { data } = props;
  const [tasks, setTasks] = useState<Task[]>(data.tasks.sort((a, b) => a.order! - b.order!));

  const onSortEnd = ({ from, to, oldIndex, newIndex }: SortableEvent) => {
    const { boardId, id: taskId } = tasks[oldIndex!];
    getTaskById(boardId!, from.id, taskId).then(({ data }) => {
      const next = {
        ...data,
        columnId: to.id,
        order: newIndex! + 1,
      };
      editTask(data, next);
    });
  };

  return (
    <ReactSortable
      list={tasks}
      setList={setTasks}
      onEnd={onSortEnd}
      animation={200}
      delayOnTouchOnly={true}
      delay={2}
      group="shared"
      className="list-group shadow-sm"
      ghostClass={'ghost'}
      id={data.id}
    >
      {tasks.map((task) => (
        <TaskItem {...task} key={task.id} />
      ))}
    </ReactSortable>
  );
};

export default TasksList;
