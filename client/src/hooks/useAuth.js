import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attempt, signInAction, signOutAction, signUpAction } from '../state/actions/auth';

const useAuth = () => {
  const { isLoading, authAttempted, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attempt);
  }, []);

  const signin = async (data) => {
    return await dispatch(signInAction(data));
  };

  const signup = async (data)=>{
    return await dispatch(signUpAction(data));
  }

  const signout = async () => {
    return await dispatch(signOutAction);
  }

  return {
    isLoading,
    authAttempted,
    user,
    signin,
    signout,
    signup
  };
};

export default useAuth;