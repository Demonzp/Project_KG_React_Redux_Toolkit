import { createSlice } from '@reduxjs/toolkit';
import { apiAuth } from '../../services/auth';

const initialState = {
  authAttempted: false,
  isLoading: false,
  user: null,
  token: null
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setAuthAttempted(state, { payload }) {
      state.authAttempted = payload;
    },
    setGuest(state) {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiAuth.endpoints.register.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        apiAuth.endpoints.register.matchFulfilled,
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        apiAuth.endpoints.register.matchRejected,
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        apiAuth.endpoints.login.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        apiAuth.endpoints.login.matchFulfilled,
        (state) => {
          state.isLoading = false;
          state.authAttempted = false;
        }
      )
      .addMatcher(
        apiAuth.endpoints.login.matchRejected,
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        apiAuth.endpoints.attempt.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        apiAuth.endpoints.attempt.matchFulfilled,
        (state, { payload }) => {
          state.authAttempted = true;
          state.isLoading = false;
          state.user = payload;
        }
      )
      .addMatcher(
        apiAuth.endpoints.attempt.matchRejected,
        (state, { payload }) => {
          console.error('error = ', payload.error);
          state.authAttempted = true;
          state.isLoading = false;
        }
      )
  },
})

export default sliceAuth;

export const { setToken, setAuthAttempted, setGuest } = sliceAuth.actions;

export const selectCurrentUser = (state) => state.auth.user;