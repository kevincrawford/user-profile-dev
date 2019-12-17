import { createReducer } from '../../util/ReducerUtil';
import { FETCH_QUESTION_CATAGORIES, FETCH_ARTICLE_CATAGORIES, FETCH_QUESTION_ALL, FETCH_QUESTION_TAGS, FETCH_ARTICLE_TAGS, FETCH_ARTICLE_ALL } from './categoryConstants';

const initialState = {};

const fetchQuestionCategories = (state, payload) => {
  return { ...state, questionCategories: payload };
};

const fetchQuestionTags = (state, payload) => {
  return { ...state, questionTags: payload };
};

const fetchQuestionCategoriesAndTags = (state, payload) => {
  return { ...state, questionCategories: payload.categories, questionTags: payload.tags };
};

const fetchArticleCategories = (state, payload) => {
  return { ...state, articleCategories: payload };
};

const fetchArticleTags = (state, payload) => {
  return { ...state, articleTags: payload };
};

const fetchArticleCategoriesAndTags = (state, payload) => {
  return { ...state, articleCategories: payload.categories, articleTags: payload.tags };
};

export default createReducer(initialState, {
  [FETCH_QUESTION_CATAGORIES]: fetchQuestionCategories,
  [FETCH_QUESTION_TAGS]: fetchQuestionTags,
  [FETCH_QUESTION_ALL]: fetchQuestionCategoriesAndTags,
  [FETCH_ARTICLE_CATAGORIES]: fetchArticleCategories,
  [FETCH_ARTICLE_TAGS]: fetchArticleTags,
  [FETCH_ARTICLE_ALL]: fetchArticleCategoriesAndTags
});
