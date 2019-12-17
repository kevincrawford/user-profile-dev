import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ResetForm from '../auth/reset/ResetForm';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals,
  isPasswordForgot: state.auth.isPasswordForgot
});

const actions = { closeModal };

class ResetModal extends Component {
  handleCloseModal = () => {
    this.props.closeModal();
    this.props.history.push('/news');
  };

  render() {
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Reset Password</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ResetForm token={this.props.token} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(mapState, actions)(ResetModal));
