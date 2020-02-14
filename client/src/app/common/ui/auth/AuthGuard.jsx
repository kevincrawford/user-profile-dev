import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

const locationHelper = locationHelperBuilder({});

const isAdmin = role => {
  return role.type === 'client-user';
};

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated),
  wrapperDisplayName: 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: '/login'
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated && state.auth.currentUser && state.auth.currentUser.roles.findIndex(isAdmin) > -1),
  wrapperDisplayName: 'UserIsAdmin'
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => state.auth.loading === false && state.auth.authenticated === false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/profile',
  allowRedirectBack: false
});
