import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from '../shared/interfaces';
import { BASE_URL } from './api.props';
import { RootState } from './store';

export const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    tasksAll: builder.query<Task[], {boardId: string, columnId: string}>({
      query: ({boardId, columnId}) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`
      })
    })
  }),
})

export const { useTasksAllQuery } = tasksApi;