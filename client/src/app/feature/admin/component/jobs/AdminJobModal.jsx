import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createJob, updateJob, saveJob } from '../../AdminActions';
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
    console.log('action: ', this.props.action);
    console.log('currentJob: ', currentJob);
    if (this.props.action === 'duplicate') {
      delete currentJob._id;
      this.props.createJob(currentJob, null);
    }
    if (this.props.action === 'archive') {
      currentJob.status = 'Archived';
      this.props.saveJob(currentJob);
    }
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
        <Modal.Content>
          <Modal.Description>
            <div>
              {action} for {job.title}
            </div>
            <Button onClick={this.handleJobAction}></Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const DuplicateJob = ({ job }) => {
  return <div>duplicate {job.title}</div>;
};

const ArchiveJob = ({ job }) => {
  return <div>archive {job.title}</div>;
};

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = {
  createJob,
  updateJob,
  saveJob,
  closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminJobModal));
