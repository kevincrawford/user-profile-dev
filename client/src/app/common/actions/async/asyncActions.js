import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from './asyncConstants';

export const asyncActionStart = el => {
  return {
    type: ASYNC_ACTION_START,
    payload: el
  };
};

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  };
};

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  };
};
