import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from '../services/auth';
import sliceAppAlerts from './slices/appAlerts';
import sliceAuth from './slices/auth';

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: sliceAuth.reducer,
    appAlerts: sliceAppAlerts.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuth.middleware),
});
