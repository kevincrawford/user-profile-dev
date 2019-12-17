import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { HEADER_JSON } from '../../../api/apiConstants';
import { SEARCH_RESULTS } from './searchConstants';

export const search = form => {
  return async dispatch => {
    const header = HEADER_JSON;
    const body = JSON.stringify(form);
    try {
      const results = await axios.post('/api/search', body, header);
      dispatch({
        type: SEARCH_RESULTS,
        payload: {
          results
        }
      });
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Search Failed'
      });
    }
  };
};
