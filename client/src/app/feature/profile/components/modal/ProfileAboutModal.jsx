import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';

import { closeModal } from '../../../../common/ui/modal/ModalActions';
import { updateUserProfile, updateProfile } from '../../../../common/ui/auth/AuthActions';
const mapState = state => ({
  user: state.auth.currentUser,
  currentModal: state.modals
});

const actions = {
  closeModal,
  updateProfile,
  updateUserProfile
};

class ProfileAboutModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.updateProfile(e.target.name, e.target.value);
  }

  handleCloseModal() {
    this.props.closeModal();
  }

  handleSubmit() {
    const { displayName, title, summary } = this.props.user;
    const form = {
      displayName: displayName,
      title: title,
      summary: summary
    };
    console.log('form: ', form);
    if (!form.displayName || form.displayName.length < 0) {
      return;
    }
    this.props.updateUserProfile(form);
    this.props.closeModal();
  }

  render() {
    let { displayName, title, summary } = this.props.user;
    displayName = displayName ? displayName : '';
    title = title ? title : '';
    summary = summary ? summary : '';
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>About Me</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form size='small' onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Full Name</label>
                <Form.Input type='text' name='displayName' value={displayName} onChange={this.handleChange} required />
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <Form.Input name='title' value={title} onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Summary</label>
                <Form.Input name='summary' value={summary} onChange={this.handleChange} />
              </Form.Field>
              <Button color='green' type='submit'>
                Submit
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(mapState, actions)(ProfileAboutModal);
