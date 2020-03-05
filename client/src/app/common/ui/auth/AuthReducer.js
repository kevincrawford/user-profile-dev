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
  SET_RECAPTCHA_TOKEN,
  SET_REGISTER_STEP,
  SET_EMPLOYER,
  UPDATE_PROFILE
} from './AuthContantants';

const initialState = {
  token: localStorage.getItem('token'),
  authenticated: false,
  loading: true,
  isPasswordForgot: false,
  isPasswordSent: false,
  registerStep: 1,
  isEmployer: false,
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

const updateProfile = (state, payload) => {
  return {
    ...state,
    currentUser: {
      ...state.currentUser,
      [payload.prop]: payload.value
    }
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

const setRegisterStep = (state, payload) => {
  return {
    ...state,
    registerStep: payload
  };
};

const setIsEmployer = (state, payload) => {
  return {
    ...state,
    isEmployer: payload
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
  [SET_RECAPTCHA_TOKEN]: setRecaptchaToken,
  [SET_REGISTER_STEP]: setRegisterStep,
  [SET_EMPLOYER]: setIsEmployer,
  [UPDATE_PROFILE]: updateProfile
});
