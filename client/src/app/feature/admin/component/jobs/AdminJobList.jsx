import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../../common/ui/loading/Loading'

import { fetchJobs } from '../../AdminActions';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  jobs: state.admin.jobs
});

const actions = {
  fetchJobs
};

export class AdminJobList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    const { loading, loadingName } = this.props;
    if (loading && loadingName === 'admin-job-list') return <Loading />;
    return <div>Jobs List</div>;
  }
}

export default connect(mapState, actions)(AdminJobList);
