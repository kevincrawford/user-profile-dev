import React from 'react';

const AccountStep4Review = props => {
  const { onSubmit, prevStep } = props;
  return (
    <>
      <h1>step 4</h1>
      <div onClick={prevStep}>prev</div>
      <div onClick={onSubmit}>next</div>
    </>
  );
};

export default AccountStep4Review;
