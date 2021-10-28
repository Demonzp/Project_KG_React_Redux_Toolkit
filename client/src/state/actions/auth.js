import MessageTypes from '../../constants/messageTypes';
import { apiAuth } from '../../services/auth';
import { setAuthAttempted, setGuest, setToken } from '../slices/auth';
import { addMessageAction } from './appAlerts';

const _isCan = (_, getState) => {

  const isLoading = getState().auth.isLoading;

  if (isLoading) {
    return false;
  }

  return true;
}

export const attempt = async (dispatch, getState) => {
  try {

    const authAttempted = getState().auth.authAttempted;
    const localToken = localStorage.getItem('token');

    if (authAttempted || !dispatch(_isCan) || !localToken) {
      if(dispatch(_isCan)){
        dispatch(setAuthAttempted(true));
      }
      return;
    }

    dispatch(setToken(localToken));

    const res = await dispatch(apiAuth.endpoints.attempt.initiate());

    if (res.error) {
      if (res.error.originalStatus === 401) {
        localStorage.removeItem('token');
        dispatch(setToken(null));
      }
      throw new Error(res.error.error);
    }

  } catch (error) {
    dispatch(addMessageAction({ type: MessageTypes.ERROR, text: error.message }));
  }
};

export const signInAction = (data) => async (dispatch) => {
  try {

    if (!dispatch(_isCan)) {
      return;
    }

    const res = await dispatch(apiAuth.endpoints.login.initiate(data));

    if (res.error) {
      if (res.error.data) {
        throw new Error(res.error.data.message);
      }
      throw new Error(res.error.error);
    }

    if (res.data) {
      localStorage.setItem('token', `Bearer ${res.data.signedToken}`);
      await dispatch(attempt);
    }

  } catch (error) {
    dispatch(addMessageAction({ type: MessageTypes.ERROR, text: error.message }));
  }
};

export const signUpAction = (data) => async (dispatch) => {
  try {
    if (!dispatch(_isCan)) {
      return;
    }

    const res = await dispatch(apiAuth.endpoints.register.initiate(data));

    if (res.error) {
      if (res.error.data) {
        throw new Error(res.error.data);
      }
      throw new Error(res.error.error);
    }

    return true;
  } catch (error) {
    dispatch(addMessageAction({ type: MessageTypes.ERROR, text: error.message }));
    throw error;
  }
};

export const signOutAction = async (dispatch) => {
  try {
    await dispatch(setGuest);
    localStorage.removeItem('token');
  } catch (error) {
    dispatch(addMessageAction({ type: MessageTypes.ERROR, text: error.message }));
  }
};