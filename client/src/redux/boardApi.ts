import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/apiConsts';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: 'Tasks',
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
              ...result.map((task) => ({ type: 'Tasks', id: task.id })), // динамически привязываем теги для задач
              { type: 'Tasks', id: 'LIST' }, // аннулируем весь список
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
      refetchOnMountOrArgChange: true,
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
    addIssue: builder.mutation({
      query: ({ title, description, boardId }) => ({
        url: `tasks/${boardId.boardId}/addTask`,
        method: 'POST',
        body: { title, description },
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    editIssue: builder.mutation({
      query: ({ body, boardId, taskId }) => ({
        url: `tasks/${boardId}/tasks/${taskId}`,
        method: 'PUT',
        body,
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
} = boardApi;
