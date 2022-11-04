export interface User {
  id?: string,
  name?: string,
  login: string,
  password: string
}

export interface Board {
  id?: string,
  title: string,
  description: string
}

export interface Column {
  id?: string,
  order?: number,
  title: string,
}

export interface Task {
  id?: string,
  order?: number,
  title: string,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string,
}
