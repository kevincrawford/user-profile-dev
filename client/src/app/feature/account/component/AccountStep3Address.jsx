import React from 'react';

const AccountStep3Address = props => {
  const { onSubmit, prevStep } = props;
  return (
    <>
      <h1>step 3</h1>
      <div onClick={prevStep}>prev</div>
      <div onClick={onSubmit}>next</div>
    </>
  );
};

export default AccountStep3Address;
