import { createReducer } from '../../../util/ReducerUtil';
import { UPDATE_TAG_NAMES, CLEAR_TAGS } from './tagInputConstants';

const initialState = {
  tagNames: []
};

const updateTagNames = (state, payload) => {
  return {
    ...state,
    tagNames: payload
  };
};

const clearTagNames = state => {
  return initialState;
};

export default createReducer(initialState, {
  [UPDATE_TAG_NAMES]: updateTagNames,
  [CLEAR_TAGS]: clearTagNames
});
