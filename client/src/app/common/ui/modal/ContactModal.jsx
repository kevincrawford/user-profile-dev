import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Contact from '../contact/Contact';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals,
  auth: state.auth
});

const actions = {
  closeModal
};

class ContactModal extends Component {
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
  };

  render() {
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Contact SPEDxchange</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Contact />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(mapState, actions)(withRouter(ContactModal));
