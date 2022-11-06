import axios from "axios";
import { BASE_URL } from "../shared/environment";
import { Task } from "../shared/interfaces";

const token = localStorage.getItem('token');

function getAllTasks(boardId: string, columnId: string) {
  const response = axios.get<Task[]>(
    `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`,
    {headers: {'authorization': `Bearer ${token}`}}
  )
  return response;
}

export {getAllTasks};