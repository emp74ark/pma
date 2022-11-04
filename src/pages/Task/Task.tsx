import { FC } from "react";
import { Task } from "../../shared/interfaces";

export const TaskCard: FC<Task> = (task) => {
  return(
    <>
      <h5>{task.title}</h5>
      <span>{task.description}</span>
    </>
  )
}