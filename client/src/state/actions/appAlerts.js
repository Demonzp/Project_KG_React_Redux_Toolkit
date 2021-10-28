import { nanoid } from "@reduxjs/toolkit"
import { addMessage, delMessage } from "../slices/appAlerts";

const MAX_MESSAGES = 3;
const LIFE_TIME = 20*1000;

export const addMessageAction = (message) => (dispatch, getState)=>{
  const newMessage = {
    ...message,
    id: nanoid(10)
  }

  const messages = getState().appAlerts.messages;

  if(messages.length>=MAX_MESSAGES){
    dispatch(delMessage(messages[0].id));
  }

  setTimeout(()=>{
    dispatch(delMessage(newMessage.id));
  }, LIFE_TIME);

  dispatch(addMessage(newMessage));
}