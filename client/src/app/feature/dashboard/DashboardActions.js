import axios from 'axios';
// import { HEADER_JSON } from '../../common/constants/apiConstants';
import { FETCH_SCHOLARSHIP_APPLICATIONS, FILTER_SCHOLARSHIP_APPLICATIONS, SORT_SCHOLARSHIP_APPLICATIONS, VOTE_SCHOLARSHIP_APPLICATION } from './DashboardContants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';

export const loadScholarshipApplications = (ScholarshipName, filters) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const applications = await axios.get(`/api/scholarship/applications/${ScholarshipName}`);
      // console.log(applications);
      dispatch({
        type: FETCH_SCHOLARSHIP_APPLICATIONS,
        payload: applications.data
      });
      dispatch({
        type: FILTER_SCHOLARSHIP_APPLICATIONS,
        payload: filters
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const filterScholarshipApplications = filters => {
  return dispatch => {
    dispatch({
      type: FILTER_SCHOLARSHIP_APPLICATIONS,
      payload: filters
    });
  };
};

export const voteScholarshipApplication = (applicationId, vote) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      // console.log(`/api/scholarship/application/${applicationId}/${vote}`);
      const application = await axios.get(`/api/scholarship/application/${applicationId}/${vote}`);
      // console.log(application);
      dispatch({
        type: VOTE_SCHOLARSHIP_APPLICATION,
        payload: application.data
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const sortScholarshipApplications = () => {
  return dispatch => {
    dispatch({
      type: SORT_SCHOLARSHIP_APPLICATIONS
    });
    dispatch({
      type: FILTER_SCHOLARSHIP_APPLICATIONS,
      payload: { likeCount: likeCount => likeCount > -1 }
    });
  };
};
