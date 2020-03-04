import axios from 'axios';
import { HEADER_JSON } from '../../common/constants/apiConstants';
import { FETCH_ORG, FETCH_JOBS, FETCH_JOB, UPDATE_JOB, DELETE_JOB } from './AdminConstants';
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
      const jobs = await axios.get(`/api/job/list`);
      dispatch({ type: FETCH_JOBS, payload: jobs.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const fetchJob = (id, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart('fetch-job'));
      const job = await axios.get(`/api/job/${id}`);
      console.log('job: ', job.data);
      dispatch({ type: FETCH_JOB, payload: job.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      if (history) {
        history.push(`/admin/job/new`);
      }
    }
  };
};

export const createJob = (job, history) => {
  const body = JSON.stringify(job);
  return async dispatch => {
    try {
      dispatch(asyncActionStart('fetch-job'));
      const newJob = await axios.post(`/api/job`, body, HEADER_JSON);
      dispatch({ type: FETCH_JOB, payload: newJob.data });
      dispatch(asyncActionFinish());
      history.push(`/admin/job/${newJob.data._id}`);
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const updateJob = (prop, value) => {
  return dispatch => {
    dispatch({ type: UPDATE_JOB, payload: { prop: prop, value: value } });
  };
};

export const saveJob = job => {
  const body = JSON.stringify(job);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const savedJob = await axios.put(`/api/job`, body, HEADER_JSON);
      dispatch({ type: FETCH_JOB, payload: savedJob.data });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Job Saved');
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
