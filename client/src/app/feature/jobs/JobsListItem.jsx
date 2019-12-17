import React from 'react';

const JobsListItem = props => {
  const { title, link, company, location, description, date } = props.job;
  return (
    <div className='job-list-item'>
      <hr />
      <h3>
        <a href={link} target='_blank' rel='noopener noreferrer' title={title}>
          {title}
        </a>
      </h3>
      <p>
        <strong>{company}</strong>&nbsp;&nbsp;|&nbsp;{' '}
        {location && location.length > 0 && (
          <>
            <span>{location}</span>&nbsp;&nbsp;|&nbsp;{' '}
          </>
        )}
        <span>{date}</span>
      </p>
      <p>{description}</p>
    </div>
  );
};

export default JobsListItem;
