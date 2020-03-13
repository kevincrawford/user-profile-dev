import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Icon, Button, Breadcrumb } from 'semantic-ui-react';
import Loading from '../../../../common/ui/loading/Loading';
import moment from 'moment/moment.js';
import * as _ from 'lodash';
import { fetchJobs, fetchOrg, clearJob, saveJob, createJob } from '../../AdminActions';
import { openModal } from '../../../../common/ui/modal/ModalActions';

export class AdminJobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ['Published', 'Draft']
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleJobAction = this.handleJobAction.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
    this.filterJobs = this.filterJobs.bind(this);
  }

  componentDidMount() {
    this.props.fetchOrg(this.props.user.organization);
    this.props.fetchJobs(this.props.user.organization);
  }

  handleJobAction(job, action, index) {
    console.log(job);
    this.props.openModal('AdminJobModal', { ...this.props, job: job, action: action });
  }

  handleEditClick(id) {
    this.props.history.push(`/admin/job/${id}`);
  }

  handleNewJob(id) {
    this.props.clearJob();
    this.props.history.push(`/admin/job/new`);
  }

  filterJobs() {
    if (this.state.filter) {
      const predicate = function() {
        const args = _.toArray(arguments);
        // console.log('args: ', args);
        return job => {
          // console.log('job: ', job);
          let equalsJobStatus = _.partial(_.isEqual, job.status);
          return args.some(equalsJobStatus);
        };
      };
      return _.filter(this.props.jobs, predicate(...this.state.filter));
    } else {
      return this.props.jobs;
    }
  }

  render() {
    const { loading, loadingName, jobs } = this.props;
    if (loading && loadingName === 'admin-job-list') return <Loading />;
    return (
      <div>
        <div className='admin-nav'>
          <div className='flex-box between'>
            <div className='flex-box align-center grow'>
              <Breadcrumb size='large'>
                <Breadcrumb.Section>Job List</Breadcrumb.Section>
              </Breadcrumb>
            </div>
            <Button content='New Job' primary onClick={this.handleNewJob} />
          </div>
        </div>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Job Title</Table.HeaderCell>
              <Table.HeaderCell width={2}>Status</Table.HeaderCell>
              <Table.HeaderCell width={2}>Last Update</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign='right'></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Array.isArray(jobs) &&
              this.filterJobs(jobs).length > 0 &&
              this.filterJobs(jobs).map((job, index) => (
                <Table.Row key={job._id}>
                  <Table.Cell>{job.title}</Table.Cell>
                  <Table.Cell>{job.status}</Table.Cell>
                  <Table.Cell>{moment(job.updated).from()}</Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/*
                    <Icon link color='red' name='remove' onClick={() => this.handleRemoveClick(job._id)} />
                    &nbsp;&nbsp;
                    */}
                    <Icon
                      link
                      className='ml-2'
                      color='orange'
                      name='file archive outline'
                      title='Archive Job'
                      onClick={() => this.handleJobAction(job, 'archive', index)}
                    />
                    <Icon
                      link
                      className='ml-2'
                      color='grey'
                      name='copy outline'
                      title='Copy Job'
                      onClick={() => this.handleJobAction(job, 'copy', index)}
                    />
                    <Icon
                      link
                      className='ml-2'
                      color='green'
                      name='edit outline'
                      title='Edit Job'
                      onClick={() => this.handleEditClick(job._id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            <Table.Row onClick={this.handleNewJob}>
              <Table.Cell>
                <span className='link'>Create New Job</span>
              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell textAlign='right'>
                <Icon link color='green' name='add' />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  jobs: state.admin.jobs,
  user: state.auth.currentUser
});

const actions = {
  createJob,
  saveJob,
  clearJob,
  fetchJobs,
  fetchOrg,
  openModal
};

export default connect(mapState, actions)(withRouter(AdminJobList));
