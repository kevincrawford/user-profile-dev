import React from 'react';

const AccountStep2Admin = props => {
  const { onSubmit, prevStep } = props;
  return (
    <>
      <h1>Primary Contact</h1>
      <div onClick={prevStep}>prev</div>
      <div onClick={onSubmit}>next</div>
    </>
  );
};

export default AccountStep2Admin;
