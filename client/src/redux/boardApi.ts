import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/apiConsts';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
  }),
  endpoints: (builder) => ({
    getTodoIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Todo`,
      }),
    }),
    getInProgressIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=InProgress`,
      }),
    }),
    getDoneIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Done`,
      }),
    }),
    deleteIssue: builder.mutation({
      query: ({ boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetTodoIssuesQuery,
  useLazyGetInProgressIssuesQuery,
  useLazyGetDoneIssuesQuery,
  useDeleteIssueMutation,
} = boardApi;
