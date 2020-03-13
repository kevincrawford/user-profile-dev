import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { closeModal } from '../../../../common/ui/modal/ModalActions';

import { Modal, Button } from 'semantic-ui-react';

export class AdminJobModal extends Component {
  constructor(props) {
    super(props);

    this.handleJobAction = this.handleJobAction.bind(this);
    this.onRouteChanged = this.onRouteChanged.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  handleJobAction() {
    const currentJob = Object.assign({}, this.props.job);
    let time = 100;
    if (this.props.action === 'copy') {
      time = 1000;
      delete currentJob._id;
      currentJob.title = currentJob.title + '(copy)';
      currentJob.status = 'Draft';
      this.props.createJob(currentJob, null);
    }
    if (this.props.action === 'archive') {
      currentJob.status = 'Archived';
      this.props.saveJob(currentJob);
    }
    setTimeout(() => {
      this.props.fetchJobs(this.props.user.organization);
    }, time);
    this.handleCloseModal();
  }

  onRouteChanged() {
    this.handleCloseModal();
  }

  handleCloseModal() {
    this.props.closeModal();
  }

  render() {
    const { job, action } = this.props;
    return (
      <Modal size='mini' open={true} onClose={this.handleCloseModal}>
        <Modal.Header>
          <span className='capitalize'>{action} Job</span>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>Do you want to {action} the job titled:</div>
            <div>
              <strong>{job.title}?</strong>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleCloseModal}>Cancel</Button>
          <Button positive className='capitalize' onClick={this.handleJobAction}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminJobModal));
