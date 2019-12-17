import axios from 'axios';
import { FETCH_QUESTION_CATAGORIES, FETCH_ARTICLE_CATAGORIES, FETCH_QUESTION_ALL, FETCH_QUESTION_TAGS, FETCH_ARTICLE_TAGS, FETCH_ARTICLE_ALL } from './categoryConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

// Load Question Categories and Tags
export const loadQuestionCategoriesAndTags = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/category/question');
      const tags = await axios.get('/api/tags/question/suggestions');
      dispatch({
        type: FETCH_QUESTION_ALL,
        payload: {
          categories: categories.data,
          tags: tags.data
        }
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// Load Question Categories
export const loadQuestionCategories = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/category/question');
      dispatch({ type: FETCH_QUESTION_CATAGORIES, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// Load Question Tags
export const loadQuestionTags = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/tags/question');
      dispatch({ type: FETCH_QUESTION_TAGS, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// Load Article Categories and Tags
export const loadArticleCategoriesAndTags = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/category/article');
      const tags = await axios.get('/api/tags/article/suggestions');
      dispatch({
        type: FETCH_ARTICLE_ALL,
        payload: {
          categories: categories.data,
          tags: tags.data
        }
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// Load Article Categories
export const loadArticleCategories = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/category/article');
      dispatch({ type: FETCH_ARTICLE_CATAGORIES, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// Load Article Tags
export const loadArticleTags = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const categories = await axios.get('/api/tags/article');
      dispatch({ type: FETCH_ARTICLE_TAGS, payload: categories.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
