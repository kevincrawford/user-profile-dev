import { INCREMENT_COUNTER, DECREMENT_COUNTER, TEST_ITEM_CLICK } from './TestConstants';
import { createReducer } from '../../common/util/ReducerUtil';

const initialState = {
  data: 42,
  latlng: {
    lat: 41.8461,
    lng: 87.8157
  },
  activeItem: 'Questions'
};

const incrementCounter = state => {
  return { ...state, data: state.data + 1 };
};

const decrementCounter = state => {
  return { ...state, data: state.data - 1 };
};

const itemClick = (state, payload) => {
  return { activeItem: payload };
};

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
  [TEST_ITEM_CLICK]: itemClick
});
