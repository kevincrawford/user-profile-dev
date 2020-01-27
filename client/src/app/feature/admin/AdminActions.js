import axios from 'axios';
import { HEADER_JSON } from '../../common/constants/apiConstants';
import { JOB_LOADED, JOB_SAVED } from './AdminConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';
import { toastr } from 'react-redux-toastr';

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
