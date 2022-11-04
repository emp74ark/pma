import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../shared/interfaces';

interface authResponse {
  status: 'pending'|'fulfilled'|'rejected';
  token: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
}

export const api = createApi({
  reducerPath: 'kanban',
  baseQuery: fetchBaseQuery({baseUrl: 'https://hidden-spire-47117.herokuapp.com'}),
  endpoints: (builder) => ({
    login: builder.mutation<authResponse, User>({
      query: ({login, password}) => ({
        url: 'signin',
        method: 'POST',
        body: {login, password},
      })
    })
  }),
})

export const { useLoginMutation } = api;