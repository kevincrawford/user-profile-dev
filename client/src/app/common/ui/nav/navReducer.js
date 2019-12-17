import { createReducer } from '../../util/ReducerUtil';
import { ACTIVATE_NAV_ITEM, TOGGLE_MOBILE_NAV, TOGGLE_SEARCH_BAR, TOGGLE_SIDE_BAR } from './navConstants';

const initialState = {
  isMobileNavOpen: false,
  isSearchBarOpen: false,
  activeNavItem: {
    name: 'SPEDxchange',
    link: '/questions'
  }
};

const onNavItemClick = (state, payload) => {
  return { ...state, activeNavItem: payload };
};

const toggleMobileNav = state => {
  return { ...state, isMobileNavOpen: !state.isMobileNavOpen };
};

const toggleSearchBar = state => {
  return { ...state, isSearchBarOpen: !state.isSearchBarOpen };
};

const toggleSideBar = state => {
  return { ...state, isSideBarOpen: !state.isSideBarOpen };
};

export default createReducer(initialState, {
  [ACTIVATE_NAV_ITEM]: onNavItemClick,
  [TOGGLE_MOBILE_NAV]: toggleMobileNav,
  [TOGGLE_SEARCH_BAR]: toggleSearchBar,
  [TOGGLE_SIDE_BAR]: toggleSideBar
});
