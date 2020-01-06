import { createReducer } from '../../common/util/ReducerUtil';
import {
  FETCH_SCHOLARSHIP_APPLICATIONS,
  FILTER_SCHOLARSHIP_APPLICATIONS
} from './DashboardContants';
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

export default createReducer(initialState, {
  [FETCH_SCHOLARSHIP_APPLICATIONS]: fetchScholarshipApplications,
  [FILTER_SCHOLARSHIP_APPLICATIONS]: filterScholarshipApplications
});
