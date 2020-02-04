import axios from 'axios';
import { HEADER_JSON } from '../../common/constants/apiConstants';
import { FETCH_JOBS, SET_JOB, UPDATE_JOB, DELETE_JOB, JOB_LOADED, JOB_SAVED } from './AdminConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';
import { toastr } from 'react-redux-toastr';

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
