import { UPDATE_TAG_NAMES, CLEAR_TAGS } from '../actions/tagInputConstants';

export const handleUpdateTagNames = tagNames => {
  return dispatch => {
    dispatch({ type: UPDATE_TAG_NAMES, payload: tagNames });
  };
};

export const clearTags = () => {
  return dispatch => {
    dispatch({ type: CLEAR_TAGS });
  };
};
