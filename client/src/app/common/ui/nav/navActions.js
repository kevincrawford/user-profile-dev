import { ACTIVATE_NAV_ITEM, TOGGLE_MOBILE_NAV, TOGGLE_SEARCH_BAR } from './navConstants';

export const navItemClick = item => {
  return dispatch => {
    dispatch({
      type: ACTIVATE_NAV_ITEM,
      payload: {
        item
      }
    });
  };
};

export const toggleMobileNav = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MOBILE_NAV
    });
  };
};

export const toggleSearchBar = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SEARCH_BAR
    });
  };
};
