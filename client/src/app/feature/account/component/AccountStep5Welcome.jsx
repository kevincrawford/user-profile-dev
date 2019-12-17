import React from 'react';

const AccountStep5Welcome = props => {
  const { onSubmit, setStep } = props;
  return (
    <>
      <h1>step 5</h1>
      <div onClick={() => setStep(1)}>step 1</div>
      <div onClick={() => setStep(2)}>step 2</div>
      <div onClick={() => setStep(3)}>step 3</div>
      <div onClick={() => setStep(4)}>step 4</div>
      <div onClick={() => onSubmit('my values')}>submit</div>
    </>
  );
};

export default AccountStep5Welcome;
