import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../../ui/modal/ModalActions';

// const isClient = role => {
//   return role.type === 'client-user';
// };

export const UserCanAsk = connectedReduxRedirect({
  wrapperDisplayName: 'UserCanAsk',
  allowRedirectBack: true,
  redirectPath: '/ask',
  authenticatedSelector: state => (state.auth.loading ? true : state.auth.authenticated),
  redirectAction: newLoc => dispatch => {
    dispatch(openModal('UnauthModal'));
  }
});
