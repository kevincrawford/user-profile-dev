import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_JOBS, JOB_LOADED, JOB_SAVED } from './AdminConstants';

const initialState = {
  jobs: []
};

const fetchJobs = (state, payload) => {
  console.log('fetchJobs: jobs: ', payload);
  return {
    ...state,
    jobs: payload || []
  };
};

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
  [FETCH_JOBS]: fetchJobs,
  [JOB_LOADED]: loadJob,
  [JOB_SAVED]: saveJob
});
