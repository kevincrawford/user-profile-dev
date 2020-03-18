import React from 'react';
import moment from 'moment/moment.js';

const JobsListLocalItem = props => {
  const { title, link, organization, location, summary, updated } = props.job;
  return (
    <div className='job-list-item'>
      <hr />
      <h3>
        <a href={link} target='_blank' rel='noopener noreferrer' title={title}>
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
};

export default JobsListLocalItem;
