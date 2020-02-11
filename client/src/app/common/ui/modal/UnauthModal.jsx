import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { openModal, closeModal } from './ModalActions';

const mapState = state => ({});

const actions = { openModal, closeModal };

export class UnauthModal extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.props.closeModal();
  }

  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const { openModal } = this.props;
    return (
      <Modal size='mini' className='unauth-modal' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>You must be logged in to share...</Modal.Header>
        <Modal.Description>
          <Button.Group widths={3}>
            <Button fluid color='teal' onClick={() => openModal('LoginModal', { fromAuth: true })}>
              Login
            </Button>
            <Button.Or />
            <Button fluid positive onClick={() => openModal('RegisterModal', { fromAuth: true })}>
              Sign Up
            </Button>
          </Button.Group>
          <Divider />
          <div className='text-center'>
            <Button onClick={this.handleCloseModal}>Cancel</Button>
          </div>
        </Modal.Description>
      </Modal>
    );
  }
}

export default withRouter(connect(mapState, actions)(UnauthModal));
