import React from 'react';

export const ProfileAbout = ({ user, openEditor }) => {
  return (
    <section>
      <div className='d-flex w-100'>
        <h6 className='flex-grow-1 d-block m-0'>
          <b>About Me</b>
        </h6>
        <span className='link' onClick={() => openEditor('about')}>
          Edit
        </span>
      </div>
      <div className='section-content' onClick={() => openEditor('about')}>
        <div className='avatar_wrap'>
          <a>
            <div className='avatar'>
              <span className='photo'>
                <img src='{user.photoUrl}' alt='My Avatar' />
              </span>
              <i className='badge add'>Add Photo</i>
            </div>
          </a>
        </div>
        <div className='text-center'>
          <b>{user.name}</b>
        </div>
        <ul className='profile-group'>
          <li>
            {user.headline && (
              <span>
                <strong>
                  <em>{user.headline}</em>
                </strong>
              </span>
            )}
            {!user.headline && (
              <span className='link'>
                <strong>
                  <em>Add My Headline</em>
                </strong>
              </span>
            )}
          </li>
          <li>
            {user.location && (
              <span>
                <strong>
                  <em>{user.location}</em>
                </strong>
              </span>
            )}
            {!user.location && (
              <span className='link'>
                <strong>
                  <em>Add My Location</em>
                </strong>
              </span>
            )}
          </li>
          <li>
            {user.phone && (
              <span>
                <strong>
                  <em>{user.phone}</em>
                </strong>
              </span>
            )}
            {!user.phone && (
              <span className='link'>
                <strong>
                  <em>Add My Phone</em>
                </strong>
              </span>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};
