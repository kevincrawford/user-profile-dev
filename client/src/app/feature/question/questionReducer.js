import { createReducer } from '../../common/util/ReducerUtil';
import { CREATE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION, FETCH_QUESTIONS, FETCH_QUESTION_PAGE, FETCH_QUESTION, ANSWER_QUESTION } from './questionConstants';

const initialState = {
  activePage: 1,
  totalPages: 1,
  questionCount: 0,
  questions: null
};

const createQuestion = (state, payload) => {
  return {
    ...state,
    questions: [...state.questions, payload]
  };
};

const updateQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload,
    questions: state.questions ? [...state.questions.filter(question => question._id !== payload._id), payload] : null
  };
};

const deleteQuestion = (state, payload) => {
  return {
    ...state,
    questions: state.questions ? [...state.questions.filter(question => question._id !== payload.questionId)] : null
  };
};

const fetchQuestions = (state, payload) => {
  return {
    ...state,
    questionCount: payload.questionCount,
    questions: payload.questions
  };
};

const fetchQuestionsPage = (state, payload) => {
  return {
    ...state,
    activePage: payload.activePage,
    totalPages: payload.totalPages,
    questionCount: payload.questionCount,
    questions: payload.questions
  };
};

const fetchQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload
  };
};

const answerQuestion = (state, payload) => {
  return {
    ...state,
    currentQuestion: payload
  };
};

export default createReducer(initialState, {
  [CREATE_QUESTION]: createQuestion,
  [UPDATE_QUESTION]: updateQuestion,
  [DELETE_QUESTION]: deleteQuestion,
  [FETCH_QUESTIONS]: fetchQuestions,
  [FETCH_QUESTION_PAGE]: fetchQuestionsPage,
  [FETCH_QUESTION]: fetchQuestion,
  [ANSWER_QUESTION]: answerQuestion
});
