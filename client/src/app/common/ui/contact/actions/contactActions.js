import axios from 'axios';
import { reset } from 'redux-form';
import { CONTACT_SUCCESS, CONTACT_FAIL, CONTACT_CLOSE } from './contactConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../../actions/async/asyncActions';
import { MODAL_CLOSE } from '../../modal/ModalConstants';
import { HEADER_JSON } from '../../../constants/apiConstants';

const header = HEADER_JSON;

export const submitContact = form => {
  return async dispatch => {
    try {
      const body = JSON.stringify(form);
      dispatch(asyncActionStart());
      await axios.post('/api/contact', body, header);
      dispatch({ type: CONTACT_SUCCESS });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch({ type: CONTACT_FAIL });
      dispatch(asyncActionError());
    }
  };
};

export const closeContactModal = () => {
  return dispatch => {
    dispatch(reset('contactForm'));
    dispatch({ type: CONTACT_CLOSE });
    dispatch({ type: MODAL_CLOSE });
  };
};
