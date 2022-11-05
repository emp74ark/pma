import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { fakeTasks } from "./Task.props";

export const TasksList: FC = () => {
  // async function getTasks(columnId: string) {
  //   const response = await axios.get<Task[]>(
  //     `${BASE_URL}/boards/${params.boardId!}/columns/${columnId}`,
  //     {headers: {'authorization': `Bearer ${token}`}
  //   })
  //   return response.data;
  // }
  return(
    <>
      <ListGroup>
          {fakeTasks.map((task) => (
            <ListGroup.Item key={task.id}>
              <h5>{task.title}</h5>
              <span>{task.description}</span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  )
}