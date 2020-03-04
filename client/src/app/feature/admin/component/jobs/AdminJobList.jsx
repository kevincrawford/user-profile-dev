import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Icon, Button } from 'semantic-ui-react';
import Loading from '../../../../common/ui/loading/Loading';
import moment from 'moment/moment.js';

import { fetchJobs, fetchOrg } from '../../AdminActions';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  jobs: state.admin.jobs
});

const actions = {
  fetchJobs,
  fetchOrg
};

export class AdminJobList extends Component {
  constructor(props) {
    super(props);

    console.log('fetchOrg');
    this.props.fetchOrg();

    console.log('fetchJobs');
    this.props.fetchJobs();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
  }

  handleEditClick(id) {
    this.props.history.push(`/admin/job/${id}`);
  }

  handleNewJob(id) {
    this.props.history.push(`/admin/job/new`);
  }

  render() {
    const { loading, loadingName, jobs } = this.props;
    if (loading && loadingName === 'admin-job-list') return <Loading />;
    return (
      <div>
        <div className='text-right'>
          <Button content='New Job' primary onClick={this.handleNewJob} />
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
                <Table.Row key={job._id} onClick={() => this.handleEditClick(job._id)}>
                  <Table.Cell>{job.title}</Table.Cell>
                  <Table.Cell>{job.status}</Table.Cell>
                  <Table.Cell>{moment(job.updated).from()}</Table.Cell>
                  <Table.Cell textAlign='right'>
                    <Icon link name='edit outline' />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(AdminJobList));
