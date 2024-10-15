import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/apiConsts';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['Todo', 'InProgress', 'Done'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
  }),
  endpoints: (builder) => ({
    getTodoIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Todo`,
      }),
      providesTags: ['Todo'],
    }),
    getInProgressIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=InProgress`,
      }),
      providesTags: ['InProgress'],
    }),
    getDoneIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Done`,
      }),
      providesTags: ['Done'],
    }),
    deleteIssue: builder.mutation({
      query: ({ boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo', 'InProgress', 'Done'],
    }),
    addIssue: builder.mutation({
      query: ({ title, description, boardId }) => ({
        url: `tasks/${boardId}/addTask`,
        method: 'POST',
        body: { title, description },
      }),
      invalidatesTags: ['Todo'],
    }),
    editIssue: builder.mutation({
      query: ({ title, description, boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: ['Todo', 'InProgress', 'Done'],
    }),
    updateTaskStatus: builder.mutation({
      query: ({ boardId, taskId, status }) => ({
        url: `/tasks/${boardId}/tasks/${taskId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Todo', 'InProgress', 'Done'],
    }),
    createBoard: builder.mutation({
      query: () => ({
        url: `/boards/create`,
        method: 'POST',
      }),
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
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
  useAddIssueMutation,
  useEditIssueMutation,
  useUpdateTaskStatusMutation,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
