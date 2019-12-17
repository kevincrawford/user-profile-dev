import { createReducer } from '../../../../common/util/ReducerUtil';
import { UPDATE_TAB, UPDATE_CATEGORY, UPDATE_TAGS, UPDATE_TAG_NAMES, UPDATE_EDITOR, QUESTION_SUBMITED } from './questionFormConstants';

const initialState = {
  tags: [],
  activeQuestionTab: 1,
  categoryId: null,
  tagNames: []
};

const updateTab = (state, payload) => {
  return {
    ...state,
    activeQuestionTab: payload
  };
};

const updateCategory = (state, payload) => {
  return {
    ...state,
    categoryId: payload
  };
};

const updateTags = (state, payload) => {
  return {
    ...state,
    tags: [...state.tags, payload]
  };
};

const updateTagNames = (state, payload) => {
  return {
    ...state,
    tagNames: [...state.tagNames, payload]
  };
};

const updateEditor = (state, payload) => {
  // console.log('updateEditor: state: ', state);
  // console.log('updateEditor: payload: ', payload);
  return {
    ...state,
    editorValue: payload
  };
};

const onQuestionSumitted = state => {
  // console.log('onQuestionSumitted');
  return initialState;
};

export default createReducer(initialState, {
  [UPDATE_TAB]: updateTab,
  [UPDATE_CATEGORY]: updateCategory,
  [UPDATE_TAGS]: updateTags,
  [UPDATE_EDITOR]: updateEditor,
  [UPDATE_TAG_NAMES]: updateTagNames,
  [QUESTION_SUBMITED]: onQuestionSumitted
});
