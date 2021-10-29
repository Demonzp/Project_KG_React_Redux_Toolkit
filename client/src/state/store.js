import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from '../services/auth';
import { apiEmployees } from '../services/employees';
import sliceAppAlerts from './slices/appAlerts';
import sliceAuth from './slices/auth';
import sliceEmployees from './slices/employees';

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiEmployees.reducerPath]: apiEmployees.reducer,
    auth: sliceAuth.reducer,
    appAlerts: sliceAppAlerts.reducer,
    employees: sliceEmployees.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware)
    .concat(apiEmployees.middleware),
});
