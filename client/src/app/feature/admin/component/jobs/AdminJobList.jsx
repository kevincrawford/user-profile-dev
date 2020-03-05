import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Icon, Button, Breadcrumb } from 'semantic-ui-react';
import Loading from '../../../../common/ui/loading/Loading';
import moment from 'moment/moment.js';

import { fetchJobs, fetchOrg, clearJob } from '../../AdminActions';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  jobs: state.admin.jobs,
  user: state.auth.currentUser
});

const actions = {
  clearJob,
  fetchJobs,
  fetchOrg
};

export class AdminJobList extends Component {
  constructor(props) {
    super(props);

    this.props.fetchOrg(this.props.user.organization);
    this.props.fetchJobs();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
  }

  handleEditClick(id) {
    this.props.history.push(`/admin/job/${id}`);
  }

  handleRemoveClick(id) {
    console.log(id);
  }

  handleNewJob(id) {
    this.props.clearJob();
    this.props.history.push(`/admin/job/new`);
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
              <Table.HeaderCell width={8}>Job Title</Table.HeaderCell>
              <Table.HeaderCell width={1}>Status</Table.HeaderCell>
              <Table.HeaderCell width={2}>Last Update</Table.HeaderCell>
              <Table.HeaderCell width={1} textAlign='right'></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {jobs &&
              jobs.map(job => (
                <Table.Row key={job._id}>
                  <Table.Cell>{job.title}</Table.Cell>
                  <Table.Cell>{job.status}</Table.Cell>
                  <Table.Cell>{moment(job.updated).from()}</Table.Cell>
                  <Table.Cell textAlign='right'>
                    {/*
                    <Icon link color='red' name='remove' onClick={() => this.handleRemoveClick(job._id)} />
                    &nbsp;&nbsp;
                    */}
                    <Icon link color='green' name='edit outline' onClick={() => this.handleEditClick(job._id)} />
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

export default withRouter(connect(mapState, actions)(AdminJobList));
