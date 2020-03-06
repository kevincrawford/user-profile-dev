import axios from 'axios';
import { FETCH_USERS } from './ReportContants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';

export const fetchUsers = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart('fetch-users'));
      const users = await axios.get(`/api/reports/users`);
      console.log('users: ', users);
      dispatch({ type: FETCH_USERS, payload: users.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
