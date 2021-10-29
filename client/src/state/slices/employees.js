import { createSlice } from '@reduxjs/toolkit';
import { apiEmployees } from '../../services/employees';

const initialState = {
  isLoading: false,
};

const sliceEmployees = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(  
        apiEmployees.endpoints.getEmployees.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        apiEmployees.endpoints.getEmployees.matchFulfilled,
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        apiEmployees.endpoints.getEmployees.matchRejected,
        (state) => {
          state.isLoading = false;
        }
      )
  },
})

export default sliceEmployees;