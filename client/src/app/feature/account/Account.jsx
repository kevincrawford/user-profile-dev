import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextStep, prevStep, setStep } from './accountActions';
import AccountStep1Type from './component/AccountStep1Type';
import AccountStep2Admin from './component/AccountStep2Admin';
import AccountStep3Address from './component/AccountStep3Address';
import AccountStep4Review from './component/AccountStep4Review';
import AccountStep5Welcome from './component/AccountStep5Welcome';

const mapState = state => ({
  step: state.account.step
});

const actions = {
  nextStep,
  prevStep,
  setStep
};

export class Account extends Component {
  handleSubmit = values => {
    console.log('values: ', values);
  };
  render() {
    const { step, nextStep, prevStep, setStep } = this.props;
    return (
      <>
        <div className='account-form'>
          {step === 1 && <AccountStep1Type onSubmit={nextStep} />}
          {step === 2 && <AccountStep2Admin onSubmit={nextStep} prevStep={prevStep} />}
          {step === 3 && <AccountStep3Address onSubmit={nextStep} prevStep={prevStep} />}
          {step === 4 && <AccountStep4Review onSubmit={nextStep} prevStep={prevStep} />}
          {step === 5 && <AccountStep5Welcome onSubmit={this.handleSubmit} setStep={setStep} />}
        </div>
      </>
    );
  }
}

export default connect(mapState, actions)(Account);
