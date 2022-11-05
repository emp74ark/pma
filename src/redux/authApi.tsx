import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../shared/interfaces';
import { BASE_URL } from './api.props';

interface authResponse {
  status: 'pending'|'fulfilled'|'rejected';
  token: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
}

interface signupResponse {
  id: string;
  name: string;
  login: string;
}

export const authApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    login: builder.mutation<authResponse, User>({
      query: ({login, password}) => ({
        url: 'signin',
        method: 'POST',
        body: {login, password},
      })
    }),
    signup: builder.mutation<signupResponse, User>({
      query: ({name, login, password}) => ({
        url: 'signup',
        method: 'POST',
        body: {name, login, password},
      })
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi;