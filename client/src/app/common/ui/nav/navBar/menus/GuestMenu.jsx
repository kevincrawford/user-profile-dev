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
      <button className='guest' onClick={register}>
        Sign Up
      </button>
    </>
  );
};

export default GuestMenu;
