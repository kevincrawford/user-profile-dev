// import axios from 'axios';
// import { HEADER_JSON } from '../../common/constants/apiConstants';
import { NEXT_STEP, PREV_STEP, SET_STEP, SUBSCRIBE_SUCCESS, SET_PRODUCT } from './accountContants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../../common/actions/async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const nextStep = () => {
  // console.log('nextStep');
  return { type: NEXT_STEP };
};

export const prevStep = () => {
  return { type: PREV_STEP };
};

export const setStep = step => {
  return { type: SET_STEP, payload: step };
};

export const setProduct = productId => {
  return { type: SET_PRODUCT, payload: productId };
};

export const paySubscription = productId => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      // const subscription = await axios.get(`/api/subscribe/${productId}`);
      // console.log('subscription: ', subscription.data);
      /*
       * Send reciept to user
       * Schedule future recipts
       */
      dispatch({ type: SUBSCRIBE_SUCCESS });
      dispatch(asyncActionFinish());
      toastr.success('Success!', 'Subscription Success');
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Error!', 'error');
    }
  };
};
