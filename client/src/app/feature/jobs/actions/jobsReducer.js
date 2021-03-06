import { createReducer } from '../../../common/util/ReducerUtil';
import { FETCH_BACKFILL_JOBS } from './jobsConstants';

const initialState = {
  backfillJobs: []
};

const loadBackfilJobs = (state, payload) => {
  return {
    ...state,
    backfillJobs: payload.jobs,
    localJobs: payload.localJobs
  };
};

export default createReducer(initialState, {
  [FETCH_BACKFILL_JOBS]: loadBackfilJobs
});
