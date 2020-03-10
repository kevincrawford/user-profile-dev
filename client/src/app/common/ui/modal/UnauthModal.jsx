import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { openModal, closeModal } from './ModalActions';

const mapState = state => ({
  currentModal: state.modals
});

const actions = { openModal, closeModal };

export class UnauthModal extends Component {
  constructor(props) {
    super(props);
    this.handleRouteChanged = this.handleRouteChanged.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handleRouteChanged();
    }
  }

  handleRouteChanged() {
    this.props.closeModal();
  }

  handleAction(modalType) {
    this.props.openModal(modalType, { fromAuth: true });
  }

  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    return (
      <Modal size='mini' className='unauth-modal' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>You must be logged in to share...</Modal.Header>
        <Modal.Description>
          <Button.Group widths={3}>
            <Button fluid color='teal' onClick={() => this.handleAction('LoginModal')}>
              Login
            </Button>
            <Button.Or />
            <Button fluid positive onClick={() => this.handleAction('RegisterModal')}>
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

export default connect(mapState, actions)(withRouter(UnauthModal));
