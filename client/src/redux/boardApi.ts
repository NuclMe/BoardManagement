import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/apiConsts';
import { TaskTypes } from '../types';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
  }),
  endpoints: (builder) => ({
    getTodoIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Todo`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((task: TaskTypes) => ({
                type: 'Tasks',
                id: task.id,
              })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    getInProgressIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=InProgress`,
      }),
      providesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    getDoneIssues: builder.query({
      query: (boardId) => ({
        url: `tasks/${boardId}/tasks?status=Done`,
      }),
      providesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    deleteIssue: builder.mutation({
      query: ({ boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    addIssue: builder.mutation({
      query: ({ title, description, status, boardId }) => ({
        url: `tasks/${boardId}/addTaskToBoard`,
        method: 'POST',
        body: { title, description, status, boardId },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    editIssue: builder.mutation({
      query: ({ title, description, boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateBoard: builder.mutation({
      query: ({ data, boardId }) => ({
        url: `boards/${boardId}`,
        method: 'PUT',
        body: data,
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
  useUpdateBoardMutation,
} = boardApi;
