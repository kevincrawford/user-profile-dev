import { INCREMENT_COUNTER, DECREMENT_COUNTER, TEST_ITEM_CLICK } from './TestConstants';
import { asyncActionFinish } from '../../common/actions/async/asyncActions';
import { ASYNC_ACTION_START } from '../../common/actions/async/asyncConstants';

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const incrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch(incrementCounter());
    dispatch(asyncActionFinish());
  };
};

export const decrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};

export const itemClick = item => {
  return {
    type: TEST_ITEM_CLICK,
    payload: item.name
  };
};
