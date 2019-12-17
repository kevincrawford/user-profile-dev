import { createReducer } from '../../common/util/ReducerUtil';
import { FETCH_LATEST_NEWS, FETCH_CURRENT_ARTICLE } from './newsConstants';

const initialState = {
  articles: null,
  currentArticle: null
};

const fetchLatestArticles = (state, payload) => {
  return { ...state, articles: payload };
};

const fetchCurrentArticle = (state, payload) => {
  return { ...state, currentArticle: payload };
};

export default createReducer(initialState, {
  [FETCH_LATEST_NEWS]: fetchLatestArticles,
  [FETCH_CURRENT_ARTICLE]: fetchCurrentArticle
});
