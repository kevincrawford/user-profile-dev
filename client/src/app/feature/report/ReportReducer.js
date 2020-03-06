import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_USERS } from './ReportContants';

const initialState = {
    users: [],
    applicants: []
  };
  
  const fetchUsers = (state, payload) => {
    return {
      ...state,
      users: payload.users,
      applicants: payload.applicants
    };
  };
  
  export default createReducer(initialState, {
    [FETCH_USERS]: fetchUsers
  });
  