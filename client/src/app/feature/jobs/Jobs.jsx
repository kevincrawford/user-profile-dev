import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobsForm from './JobsForm';
import JobsListItem from './JobsListItem';

const mapState = state => ({
  backfillJobs: state.jobs.backfillJobs
});

export class Jobs extends Component {
  render() {
    const { backfillJobs } = this.props;
    return (
      <>
        <JobsForm />
        <div className='job-list'>{backfillJobs && backfillJobs.length > 0 && backfillJobs.map((job, idx) => <JobsListItem key={idx.toString()} job={job} />)}</div>
      </>
    );
  }
}

export default connect(mapState)(Jobs);
