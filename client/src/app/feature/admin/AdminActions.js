import axios from 'axios';
import { HEADER_JSON } from '../../common/constants/apiConstants';
import { FETCH_JOBS, SET_JOB, UPDATE_JOB, DELETE_JOB, JOB_LOADED, JOB_SAVED, FETCH_ORG } from './AdminConstants';
import { LOGIN_SUCCESS } from '../../common/ui/auth/AuthContantants';
import { loadUser, welcomeUser } from '../../common/ui/auth/AuthActions';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';
import { toastr } from 'react-redux-toastr';

// Register User
export const registerOrg = org => {
  return async dispatch => {
    const body = JSON.stringify(org);
    try {
      const userToken = await axios.post('/api/organization/register', body, HEADER_JSON);
      dispatch({ type: LOGIN_SUCCESS, payload: userToken.data });
      await dispatch(loadUser());
      dispatch(welcomeUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOrg = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const org = await axios.get(`/api/organization/${id}`);
      dispatch({ type: FETCH_ORG, payload: org.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const fetchJobs = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart('admin-job-list'));
      const jobs = await axios.get(`/api/job/all`);
      dispatch({ type: FETCH_JOBS, payload: jobs.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const setJob = job => {
  return dispatch => {
    dispatch({ type: SET_JOB, payload: job });
  };
};

export const createJob = (orgId, LocationId) => {
  const body = JSON.stringify({
    organization: orgId,
    location: LocationId,
    jobId: '',
    jobType: 'Full-time',
    title: '',
    summary: '',
    description: '',
    status: 'Draft',
    salaryPeriod: 'Year',
    salaryAmount: ''
  });
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const newJob = await axios.post(`/api/job`, body, HEADER_JSON);
      dispatch({ type: UPDATE_JOB, payload: newJob });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const updateJob = job => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await axios.put(`/api/job/${job._id}`);
      dispatch({ type: UPDATE_JOB, payload: job });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const deleteJob = job => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await axios.delete(`/api/job/${job._id}`);
      dispatch({ type: DELETE_JOB, payload: job._id });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadJob = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const job = await axios.get(`/api/job/${id}`);
      dispatch({ type: JOB_LOADED, payload: job.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const saveJob = job => {
  const body = JSON.stringify(job);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const savedJob = await axios.post(`/api/jobs`, body, HEADER_JSON);
      dispatch({
        type: JOB_SAVED,
        payload: {
          savedJob
        }
      });
      toastr.success('Success!', 'Job Saved!');
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
