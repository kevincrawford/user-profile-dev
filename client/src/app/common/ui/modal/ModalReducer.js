import { createReducer } from '../../util/ReducerUtil';
import { MODAL_OPEN, MODAL_CLOSE } from './ModalConstants';

const initialState = null;

const openModal = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { ...state, modalType, modalProps };
};

const closeModal = state => {
  return null;
};

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
});
