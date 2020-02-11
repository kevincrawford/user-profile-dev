import React from 'react';

const GuestMenu = ({ postJob, login, register }) => {
  return (
    <>
      <button className='guest post-job' onClick={postJob}>
        Post a Job
      </button>
      <button className='guest' onClick={login}>
        Login
      </button>
    </>
  );
};

export default GuestMenu;
