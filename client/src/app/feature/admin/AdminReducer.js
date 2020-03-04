import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_JOBS, FETCH_ORG, JOB_LOADED, JOB_SAVED } from './AdminConstants';

const initialState = {
  org: null,
  job: null
};

const fetchJobs = (state, payload) => {
  return {
    ...state,
    jobs: payload || []
  };
};

const fetchOrg = (state, payload) => {
  return {
    ...state,
    org: payload
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
  [JOB_SAVED]: saveJob,
  [FETCH_ORG]: fetchOrg
});
