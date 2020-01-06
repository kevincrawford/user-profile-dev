import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_SCHOLARSHIP_APPLICATIONS, FILTER_SCHOLARSHIP_APPLICATIONS, VOTE_SCHOLARSHIP_APPLICATION } from './DashboardContants';
import { filterArray } from '../../common/util/filterArray';

const initialState = {};

const fetchScholarshipApplications = (state, payload) => {
  return {
    ...state,
    applications: payload
  };
};

const filterScholarshipApplications = (state, payload) => {
  const filters = payload || {};
  const filtered = filterArray(state.applications, filters);
  return {
    ...state,
    applicationFilters: filters,
    filteredApplications: filtered
  };
};

const voteScholarshipApplication = (state, payload) => {
  return {
    ...state,
    applications: state.applications ? [...state.applications.filter(application => application._id !== payload._id), payload] : null,
    filteredApplications: state.filteredApplications ? [...state.filteredApplications.filter(application => application._id !== payload._id), payload] : null
  };
};

export default createReducer(initialState, {
  [FETCH_SCHOLARSHIP_APPLICATIONS]: fetchScholarshipApplications,
  [FILTER_SCHOLARSHIP_APPLICATIONS]: filterScholarshipApplications,
  [VOTE_SCHOLARSHIP_APPLICATION]: voteScholarshipApplication
});
