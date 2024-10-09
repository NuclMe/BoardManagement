import { configureStore } from '@reduxjs/toolkit';
import { issuesApi } from './issuesApi';
import issuesDataReducer from './issuesDataSlice';
import repoInfoSlice from './repoInfoSlice';
import openAssignedIssuesDataSlice from './openAssignedIssuesDataSlice';
import closedIssuesDataSlice from './closedIssuesDataSlice';

export const store = configureStore({
  reducer: {
    [issuesApi.reducerPath]: issuesApi.reducer,
    issuesData: issuesDataReducer,
    // repoData: repoInfoSlice,
    // assignedOpenData: openAssignedIssuesDataSlice,
    // closedIssuesData: closedIssuesDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(issuesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
