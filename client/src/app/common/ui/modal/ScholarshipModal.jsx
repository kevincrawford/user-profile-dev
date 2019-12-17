import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ScholarshipForm from '../../../feature/scholarships/ScholarshipForm';
import { closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals
});

const actions = { closeModal };

class ScholarshipModal extends Component {
  handleCloseModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal size='small' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>Scholarship Application Form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <ScholarshipForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withRouter(connect(mapState, actions)(ScholarshipModal));
