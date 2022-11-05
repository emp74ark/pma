import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Board } from '../shared/interfaces';
import { BASE_URL } from './api.props';
import { RootState } from './store';

export const boardsApi = createApi({
  reducerPath: 'boards',
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
    boardsAll: builder.query<Board[], void>({
      query: () => ({
        url: 'boards'
      })
    })
  }),
})

export const { useBoardsAllQuery } = boardsApi;