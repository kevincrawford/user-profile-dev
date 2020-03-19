import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment/moment.js';
import { Icon, Button, Label } from 'semantic-ui-react';

const JobsListLocalItem = props => {
  const { _id, title, organization, location, summary, updated } = props.job;
  return (
    <div className='job-list-item'>
      <hr />
      <h3>
        <Button variant='link' onClick={() => this.props.history.push(`/jobs/${_id}`)} title={title}>
          {title}
        </Button>
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
};

export default withRouter(JobsListLocalItem);
