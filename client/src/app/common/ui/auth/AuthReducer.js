import { createReducer } from '../../util/ReducerUtil';
import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  TOGGLE_FORGOT_PASSWORD,
  FETCH_SCHOLARSHIP_APPLICATION,
  SET_RECAPTCHA_TOKEN
} from './AuthContantants';

const initialState = {
  token: localStorage.getItem('token'),
  authenticated: false,
  loading: true,
  isPasswordForgot: false,
  isPasswordSent: false,
  currentUser: {},
  scholarshipApplication: {
    school: '',
    graduation: '',
    essay: ''
  }
};

const loadUser = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    loading: false,
    isPasswordForgot: false,
    isPasswordSent: false,
    currentUser: payload
  };
};

const loginSuccess = (state, payload) => {
  localStorage.setItem('token', payload.token);
  return {
    ...state,
    ...payload,
    authenticated: true,
    loading: false,
    isPasswordForgot: false,
    isPasswordSent: false
  };
};

const logoutUser = state => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isPasswordForgot: false,
    isPasswordSent: false,
    authenticated: false,
    loading: false,
    currentUser: {}
  };
};

const toggleForgotPassword = state => {
  return {
    ...state,
    isPasswordForgot: !state.isPasswordForgot
  };
};

const loadScholarshipApplication = (state, payload) => {
  return {
    ...state,
    scholarshipApplication: payload
  };
};

const setRecaptchaToken = (state, payload) => {
  return {
    ...state,
    recaptchaToken: payload
  };
};

export default createReducer(initialState, {
  [USER_LOADED]: loadUser,
  [LOGIN_SUCCESS]: loginSuccess,
  [REGISTER_FAIL]: logoutUser,
  [AUTH_ERROR]: logoutUser,
  [LOGIN_FAIL]: logoutUser,
  [LOGOUT]: logoutUser,
  [ACCOUNT_DELETED]: logoutUser,
  [TOGGLE_FORGOT_PASSWORD]: toggleForgotPassword,
  [FETCH_SCHOLARSHIP_APPLICATION]: loadScholarshipApplication,
  [SET_RECAPTCHA_TOKEN]: setRecaptchaToken
});
