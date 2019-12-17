import React from 'react';

const GuestMenu = ({ login, register }) => {
  return (
    <>
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
