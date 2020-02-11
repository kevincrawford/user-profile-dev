import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../../ui/modal/ModalActions';

const isAdmin = role => {
  return role.type === 'client-user';
};

export const UserIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: true,
  redirectPath: '/ask',
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated),
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'));
  }
});

export const UserIsAdmin = connectedReduxRedirect({
  wrapperDisplayName: 'UserIsAdmin',
  allowRedirectBack: true,
  redirectPath: '/',
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated && state.auth.currentUser && state.auth.currentUser.roles.findIndex(isAdmin) > -1),
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'));
  }
});
