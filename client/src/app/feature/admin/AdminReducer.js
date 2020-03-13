import { createReducer } from '../../common/util/ReducerUtil';
import {
  FETCH_JOBS,
  FETCH_JOB,
  UPDATE_JOBS,
  UPDATE_JOB,
  UPDATE_JOB_PROP,
  CLEAR_JOB,
  FETCH_ORG
} from './AdminConstants';

const emptyJob = {
  jobId: '',
  jobType: 'Full-time',
  title: '',
  summary: '',
  description: '',
  status: 'Draft',
  salaryPeriod: 'Year',
  salaryAmount: ''
};

const initialState = {
  jobs: [],
  job: emptyJob
};

const fetchOrg = (state, payload) => {
  return {
    ...state,
    org: payload
  };
};

const fetchJobs = (state, payload) => {
  return {
    ...state,
    jobs: payload || []
  };
};

const fetchJob = (state, payload) => {
  return {
    ...state,
    job: payload
  };
};

const updateJobs = (state, payload) => {
  return {
    ...state,
    jobs: payload
  };
};

const updateJob = (state, payload) => {
  return {
    ...state,
    job: payload
  };
};

const updateJobProp = (state, payload) => {
  return {
    ...state,
    job: {
      ...state.job,
      [payload.prop]: payload.value
    }
  };
};

const clearJob = (state, payload) => {
  return {
    ...state,
    job: emptyJob
  };
};

export default createReducer(initialState, {
  [FETCH_JOBS]: fetchJobs,
  [FETCH_JOB]: fetchJob,
  [UPDATE_JOBS]: updateJobs,
  [UPDATE_JOB]: updateJob,
  [UPDATE_JOB_PROP]: updateJobProp,
  [FETCH_ORG]: fetchOrg,
  [CLEAR_JOB]: clearJob
});
