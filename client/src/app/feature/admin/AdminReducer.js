import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_JOBS, FETCH_JOB, UPDATE_JOB, FETCH_ORG } from './AdminConstants';

const initialState = {
  job: {
    jobId: '',
    jobType: 'Full-time',
    title: '',
    summary: '',
    description: '',
    status: 'Draft',
    salaryPeriod: 'Year',
    salaryAmount: ''
  }
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

const fetchOrg = (state, payload) => {
  return {
    ...state,
    org: payload
  };
};

const updateJob = (state, payload) => {
  return {
    ...state,
    job: {
      ...state.job,
      [payload.prop]: payload.value
    }
  };
};

export default createReducer(initialState, {
  [FETCH_JOBS]: fetchJobs,
  [FETCH_JOB]: fetchJob,
  [UPDATE_JOB]: updateJob,
  [FETCH_ORG]: fetchOrg
});
