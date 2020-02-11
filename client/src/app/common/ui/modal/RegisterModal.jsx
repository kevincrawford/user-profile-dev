import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import RegisterForm from '../auth/register/RegisterForm';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals
});

const actions = { closeModal, reset };

class RegisterModal extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
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
    this.props.reset('registerForm');
  };

  render() {
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Sign Up for SPEDxchange!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm config={this.props.currentModal.modalProps} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(mapState, actions)(RegisterModal));
