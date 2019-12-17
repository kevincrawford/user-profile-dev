import { createReducer } from '../../../util/ReducerUtil';
import { SEARCH_RESULTS } from './searchConstants';

const initialState = {};

const onSearchResults = (state, payload) => {
  return { ...state, results: payload };
};

export default createReducer(initialState, {
  [SEARCH_RESULTS]: onSearchResults
});
