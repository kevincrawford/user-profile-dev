import axios from 'axios';
import { reset } from 'redux-form';
import { HEADER_JSON } from '../../common/constants/apiConstants';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION_PAGE, FETCH_QUESTION, ANSWER_QUESTION } from './questionConstants';
import { QUESTION_SUBMITED } from './questionForm/actions/questionFormConstants';
import { CLEAR_TAGS } from '../../common/ui/form/actions/tagInputConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';
import { toastr } from 'react-redux-toastr';

const header = HEADER_JSON;

export const createQuestion = question => {
  const body = JSON.stringify(question);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await dispatch(reset('questionForm'));
      await axios.post(`/api/questions`, body, header);
      dispatch({
        type: CREATE_QUESTION,
        payload: {
          question
        }
      });
      toastr.success('Success!', 'Question has been created');
      dispatch({
        type: QUESTION_SUBMITED
      });
      dispatch({
        type: CLEAR_TAGS
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};

export const updateQuestion = question => {
  const body = JSON.stringify(question);
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      dispatch({
        type: QUESTION_SUBMITED
      });
      dispatch({
        type: CLEAR_TAGS
      });
      await axios.put(`/api/questions/${question._id}`, body, header);
      dispatch({
        type: UPDATE_QUESTION,
        payload: {
          question
        }
      });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Question has been updated');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Error!', 'error');
    }
  };
};

export const deleteQuestion = questionId => {
  return {
    type: DELETE_QUESTION,
    payload: {
      questionId
    }
  };
};

export const loadQuestions = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const questions = await axios.get('/api/questions');
      dispatch({ type: FETCH_QUESTIONS, payload: questions.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionsByPage = page => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const questions = await axios.get(`/api/questions/page/${page}`);
      dispatch({ type: FETCH_QUESTION_PAGE, payload: questions.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionBySlug = (uid, slug) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.get(`/api/questions/${uid}/${slug}`);
      dispatch({ type: FETCH_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionBySlugAsView = (uid, slug) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.get(`/api/questions/view/${uid}/${slug}`);
      dispatch({ type: FETCH_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const loadQuestionById = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.get(`/api/questions/${id}`);
      dispatch({ type: FETCH_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const answerQuestion = (id, answer) => {
  const body = JSON.stringify(answer);

  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.post(`/api/questions/answer/${id}`, body, header);
      dispatch({ type: ANSWER_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// TODO: Figure out the best place to catch if
//       the user already liked this question
export const likeQuestion = questionId => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.put(`/api/questions/like/${questionId}`);
      dispatch({ type: UPDATE_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const unlikeQuestion = questionId => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.put(`/api/questions/unlike/${questionId}`);
      dispatch({ type: UPDATE_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const likeAnswer = (questionId, answerId) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.put(`/api/questions/answer/like/${questionId}/${answerId}`);
      dispatch({ type: UPDATE_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const unlikeAnswer = (questionId, answerId) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const question = await axios.put(`/api/questions/answer/unlike/${questionId}/${answerId}`);
      dispatch({ type: UPDATE_QUESTION, payload: question.data });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
