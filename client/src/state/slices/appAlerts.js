import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const sliceAppAlerts = createSlice({
  name: 'appAlerts',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },

    delMessage(state, { payload }) {
      state.messages = state.messages.filter(msg => msg.id !== payload);
    }
  }
})

export default sliceAppAlerts;

export const { addMessage, delMessage } = sliceAppAlerts.actions;

export const selectAppAlerts = (state) => state.appAlerts.messages;