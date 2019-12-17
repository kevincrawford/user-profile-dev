import { createReducer } from '../../../util/ReducerUtil';
import { CONTACT_SUCCESS, CONTACT_FAIL, CONTACT_CLOSE } from './contactConstants';

const initialState = {
  submitted: false
};

const contactSuccess = (state, payload) => {
  return {
    ...state,
    submitted: true
  };
};

const contactFail = (state, payload) => {
  return {
    ...state,
    submitted: false
  };
};

const contactClose = (state, payload) => {
  return {
    ...state,
    submitted: false
  };
};

export default createReducer(initialState, {
  [CONTACT_SUCCESS]: contactSuccess,
  [CONTACT_FAIL]: contactFail,
  [CONTACT_CLOSE]: contactClose
});
