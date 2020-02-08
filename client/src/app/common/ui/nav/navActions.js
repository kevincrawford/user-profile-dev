import {
  ACTIVATE_NAV_ITEM,
  TOGGLE_MOBILE_NAV,
  TOGGLE_SEARCH_BAR,
  TOGGLE_SIDE_BAR,
  SET_RETURN_URL
} from './navConstants';

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

export const toggleSideBar = isOpen => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDE_BAR,
      payload: isOpen
    });
  };
};

export const setReturnUrl = pathname => {
  return dispatch => {
    dispatch({
      type: SET_RETURN_URL,
      payload: pathname
    });
  };
};
