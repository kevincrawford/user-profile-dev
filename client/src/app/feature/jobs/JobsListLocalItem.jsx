import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment/moment.js';

export class JobsListLocalItem extends Component {
  render() {
    const { _id, title, organization, location, summary, updated } = this.props.job;
    return (
      <div className='job-list-item'>
        <hr />
        <h3>
          <a href={`/jobs/${_id}`} title={title} title={title}>
            {title}
          </a>
        </h3>
        <p>
          <strong>{organization.name}</strong>&nbsp;&nbsp;|&nbsp;{' '}
          {location && location.name && location.name.length > 0 && (
            <>
              <span>
                {location.city}, {location.state}
              </span>
              &nbsp;&nbsp;|&nbsp;{' '}
            </>
          )}
          <span>{moment(updated).format('MMM D, YYYY')}</span>
        </p>
        <p>{summary}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobsListLocalItem));
