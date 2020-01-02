import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from '../../actions/async/asyncConstants';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE, TOGGLE_FORGOT_PASSWORD, FETCH_SCHOLARSHIP_APPLICATION } from './AuthContantants';
import { HEADER_JSON } from '../../constants/apiConstants';
import { closeModal } from '../../ui/modal/ModalActions';
import { toastr } from 'react-redux-toastr';
import setAuthToken from '../../util/setAuthToken';

const header = HEADER_JSON;

// Load User
export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      dispatch({
        type: AUTH_ERROR
      });
      return;
    }
    try {
      const userInfo = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: userInfo.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
};

// Register User
export const registerUser = user => {
  return async dispatch => {
    const userData = {
      displayName: user.displayName.toLowercase(),
      email: user.email.toLowercase(),
      password: user.password,
      roles: user.roles
    };

    const body = JSON.stringify(userData);
    try {
      const userToken = await axios.post('/api/users', body, header);
      dispatch({ type: LOGIN_SUCCESS, payload: userToken.data });
      await dispatch(loadUser());
      dispatch(closeModal());
      dispatch(welcomeUser());
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const transformUserInfo = data => {
  return {
    firstname: data.firstName,
    lastname: data.lastName,
    displayName: data.displayName,
    email: data.email
  };
};

export const welcomeUser = () => {
  return async () => {
    try {
      const userInfo = await axios.get('/api/auth');
      const crmInfo = transformUserInfo(userInfo.data);
      const body = JSON.stringify(crmInfo);
      await axios.post('/api/crm/contact', body, header);
      // console.log('sending emails:');
    } catch (error) {
      console.error(error.message);
    }
  };
};

// Login User
export const login = creds => {
  return async dispatch => {
    try {
      const body = JSON.stringify(creds);
      const userToken = await axios.post('/api/auth/login', body, header);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userToken.data
      });
      await dispatch(loadUser());
      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        _error: 'Login Failed'
      });
    }
  };
};

// Logout / Clear Profile
export const signOut = () => {
  return dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };
};

// Request Reset Password Email
export const requestResetInstructions = form => {
  return async dispatch => {
    try {
      const body = JSON.stringify(form);
      dispatch({ type: ASYNC_ACTION_START, payload: 'request-password-reset' });
      const resp = await axios.post('/api/auth/request-reset', body, header);
      const msg = `Check your email inbox at for the password reset instructions.`;
      const err = `No account for ${form.email} was found.`;
      const confirmMessage = !resp.data || !resp.data.success ? err : msg;
      dispatch(closeModal());
      dispatch({ type: ASYNC_ACTION_FINISH });
      toastr.confirm(confirmMessage, {
        okText: 'Close',
        disableCancel: true
      });
      dispatch({ type: TOGGLE_FORGOT_PASSWORD });
      return null;
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: 'Request Failed'
      });
    }
  };
};

// Update Password
export const updatePassword = form => {
  return async dispatch => {
    try {
      const body = JSON.stringify(form);
      dispatch({ type: ASYNC_ACTION_START, payload: 'update-password' });
      await axios.post('/api/auth/reset', body, header);
      dispatch({ type: ASYNC_ACTION_FINISH });
      dispatch(closeModal());
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const toggleForgotPassword = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_FORGOT_PASSWORD });
  };
};

export const submitScholarshipApplication = form => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'submit-scholarship' });
      const body = JSON.stringify(form);
      await axios.post('/api/auth/submit-scholarship', body, header);
      dispatch({ type: ASYNC_ACTION_FINISH });
      dispatch(closeModal());
      toastr.success('Success', 'Your Application has been submitted!');
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const fetchScholarshipApplication = scholarshipName => {
  return async dispatch => {
    try {
      dispatch({ type: ASYNC_ACTION_START, payload: 'fetch-scholarship' });
      const body = JSON.stringify({ scholarshipName: scholarshipName || 'clinical' });
      const application = await axios.post('/api/auth/scholarship-application', body, header);
      dispatch({ type: ASYNC_ACTION_FINISH });
      if (application.data.essay) {
        dispatch({ type: FETCH_SCHOLARSHIP_APPLICATION, payload: application.data });
      }
    } catch (error) {
      dispatch({ type: ASYNC_ACTION_ERROR });
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};
