import { createReducer } from '../../common/util/ReducerUtil';
import { JOB_LOADED, JOB_SAVED } from './AdminConstants';

const initialState = {};

const loadJob = (state, payload) => {
  return {
    ...state,
    currentJob: payload
  };
};

const saveJob = (state, payload) => {
  return {
    ...state,
    currentJob: payload
  };
};

export default createReducer(initialState, {
  [JOB_LOADED]: loadJob,
  [JOB_SAVED]: saveJob
});
