import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Column } from '../shared/interfaces';
import { BASE_URL } from './api.props';
import { RootState } from './store';

export const columnsApi = createApi({
  reducerPath: 'columns',
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
    columnsAll: builder.query<Column[], string>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`
      })
    })
  }),
})

export const { useColumnsAllQuery } = columnsApi;