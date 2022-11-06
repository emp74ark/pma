import axios from "axios";
import { BASE_URL } from "../shared/environment";
import { Board } from "../shared/interfaces";

const token = localStorage.getItem('token'); // TODO: move to interceptor

function getAllBoards() {
  const response = axios.get<Board[]>(
    `${BASE_URL}/boards`,
    {headers: {'authorization': `Bearer ${token}`}}
  )
  return response;
}

export {getAllBoards};