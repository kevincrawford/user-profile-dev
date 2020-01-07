import { createReducer } from '../../common/util/ReducerUtil';
import {
  FETCH_SCHOLARSHIP_APPLICATIONS,
  FILTER_SCHOLARSHIP_APPLICATIONS,
  SORT_SCHOLARSHIP_APPLICATIONS,
  VOTE_SCHOLARSHIP_APPLICATION
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

const sortScholarshipApplications = state => {
  const applications = state.applications
    ? state.applications.sort(function(a, b) {
        const aCount = !a.likeCount ? 1 : Number(a.likeCount);
        const bCount = !b.likeCount ? 1 : Number(b.likeCount);
        return bCount - aCount;
      })
    : [];
  const filteredApplications = state.filteredApplications
    ? state.applications.sort(function(a, b) {
        const aCount = !a.likeCount ? 1 : Number(a.likeCount);
        const bCount = !b.likeCount ? 1 : Number(b.likeCount);
        return bCount - aCount;
      })
    : [];
  return {
    ...state,
    applications: applications,
    filteredApplications: filteredApplications
  };
};

const voteScholarshipApplication = (state, payload) => {
  let idx;
  let applications = [...state.applications];
  let filteredApplications = [...state.applications];

  idx = applications
    .map(function(e) {
      return e._id;
    })
    .indexOf(payload._id);
  applications[idx].likeCount = payload.likeCount;

  idx = filteredApplications
    .map(function(e) {
      return e._id;
    })
    .indexOf(payload._id);
  filteredApplications[idx].likeCount = payload.likeCount;

  return {
    ...state,
    applications: applications,
    filteredApplications: filteredApplications
  };
};

export default createReducer(initialState, {
  [FETCH_SCHOLARSHIP_APPLICATIONS]: fetchScholarshipApplications,
  [FILTER_SCHOLARSHIP_APPLICATIONS]: filterScholarshipApplications,
  [VOTE_SCHOLARSHIP_APPLICATION]: voteScholarshipApplication,
  [SORT_SCHOLARSHIP_APPLICATIONS]: sortScholarshipApplications
});
