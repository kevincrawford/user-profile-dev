import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../../ui/modal/ModalActions';

// const isClient = role => {
//   return role.type === 'client-user';
// };

const testAuth = (state, ownProps) => {
  console.log('testAuth: state: ', state);
  console.log('testAuth: ownProps: ', ownProps);
  if (state.auth.loading) return true;
  if (state.auth.authenticated) return true;
  // console.log('testAuth: ownProps: ', ownProps);
  ownProps.history.push('/questions');
  return false;
};

export const UserCanAsk = connectedReduxRedirect({
  wrapperDisplayName: 'UserCanAsk',
  allowRedirectBack: true,
  redirectPath: '/questions',
  authenticatedSelector: testAuth,
  redirectAction: newLoc => dispatch => {
    // console.log('newLoc: ', newLoc);
    // console.log('dispatch: ', dispatch);

    dispatch(openModal('UnauthModal'));
  }
});
