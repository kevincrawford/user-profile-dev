import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import LoginForm from '../auth/login/LoginForm';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals,
  isPasswordForgot: state.auth.isPasswordForgot
});

const actions = { closeModal, reset };

class LoginModal extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.handleCloseModal();
  }

  handleCloseModal = () => {
    if (this.props.currentModal.modalProps && this.props.currentModal.modalProps.fromAuth) {
      this.props.history.goBack();
    }
    this.props.closeModal();
    this.props.reset('loginForm');
  };

  render() {
    const { isPasswordForgot } = this.props;
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>{!isPasswordForgot ? 'SPEDxchange Login' : 'SPEDxchange Forgot Password'}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(mapState, actions)(LoginModal));
