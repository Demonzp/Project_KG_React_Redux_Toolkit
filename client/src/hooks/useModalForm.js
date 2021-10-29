import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { addMessageAction } from '../state/actions/appAlerts';
import MessageTypes from '../constants/messageTypes';

const useModalForm = (useMutation) => {
  const [func, {error, isSuccess, isError, isLoading}] = useMutation();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isSuccess){
      setModal(false);
    }
  }, [isSuccess]);

  useEffect(()=>{
    if(isError){
      dispatch(addMessageAction({type: MessageTypes.ERROR, text: error.message}));
      setModal(false);
    }
  }, [isError])

  return {
    modal,
    setModal,
    toggleModal,
    func,
    isLoading
  }
};

export default useModalForm;