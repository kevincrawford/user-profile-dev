import axios from 'axios';
// import { HEADER_JSON } from '../../common/constants/apiConstants';
import {
  FETCH_SCHOLARSHIP_APPLICATIONS,
  FILTER_SCHOLARSHIP_APPLICATIONS
} from './DashboardContants';

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../../common/actions/async/asyncActions';

export const loadScholarshipApplications = ScholarshipName => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const applications = await axios.get(
        `/api/scholarship/applications/${ScholarshipName}`
      );
      dispatch({
        type: FETCH_SCHOLARSHIP_APPLICATIONS,
        payload: applications.data
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const filterScholarshipApplications = filters => {
  return async dispatch => {
    try {
      const applications = await axios.get(
        `/api/scholarship/applications/${ScholarshipName}`
      );
      dispatch({
        type: FETCH_SCHOLARSHIP_APPLICATIONS,
        payload: applications.data
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
