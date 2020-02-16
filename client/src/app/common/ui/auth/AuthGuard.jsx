import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import Loading from '../loading/Loading';

const locationHelper = locationHelperBuilder({});

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.authenticated,
  authenticatingSelector: state => state.auth.loading,
  wrapperDisplayName: 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
});

/*
export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/login',
  allowRedirectBack: false,
  authenticatedSelector: state => {
    console.log('userIsAdminRedir');
    console.log('authenticated: ', state.auth.authenticated);
    console.log('currentUser: ', !!state.auth.currentUser);
    console.log('roles: ', state.auth.currentUser.roles.findIndex(isAdmin));
    return state.auth.loading ? true : !!state.auth.currentUser && state.auth.currentUser.roles.findIndex(isAdmin) > -1;
  },
  wrapperDisplayName: 'UserIsAdmin'
});

  predicate: user => user.roles.findIndex(isAdmin) > -1,

*/

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !!state.auth.currentUser.organization,
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
