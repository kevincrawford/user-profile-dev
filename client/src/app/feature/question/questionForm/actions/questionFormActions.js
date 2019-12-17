import { UPDATE_TAB, UPDATE_CATEGORY, UPDATE_TAG_NAMES, UPDATE_EDITOR } from './questionFormConstants';

export const handleTabChange = tab => {
  return dispatch => {
    dispatch({
      type: UPDATE_TAB,
      payload: tab
    });
  };
};

export const handleSelectCategory = id => {
  return dispatch => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: id
    });
  };
};

export const handleUpdateTagNames = tagNames => {
  return dispatch => {
    dispatch({ type: UPDATE_TAG_NAMES, payload: tagNames });
  };
};

export const handleEditorUpdate = (content, editor) => {
  // console.log('content: ', content);
  // console.log('editor: ', editor);
  return dispatch => {
    dispatch({
      type: UPDATE_EDITOR,
      payload: content
    });
  };
};
