import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Step } from 'semantic-ui-react';
import { nextStep, prevStep, setStep } from '../accountActions';
// import { geocodeByAddress } from 'react-places-autocomplete';
import validate from './validate';
import SelectInput from '../../../common/ui/form/SelectInput';
import TextInput from '../../../common/ui/form/TextInput';
// import PlaceInput from '../../../common/ui/form/PlaceInput';

// const typeOptions = ['type 1', 'type 2', 'type 3', 'type 4', 'type 5', 'type 6', 'type 7'];
// const sizeOptions = ['big', 'small'];

import './account.scss';

const typeOptions = [
  { key: 'm', text: 'Type 1', value: '1' },
  { key: 'f', text: 'Type 2', value: '2' },
  { key: 'o', text: 'Type 3', value: '3' }
];

const sizeOptions = [
  { key: 'm', text: 'Big', value: '1' },
  { key: 'f', text: 'Small', value: '2' }
];

const mapState = state => ({
  step: state.account.step
});

const actions = {
  nextStep,
  prevStep,
  setStep
};

export class AccountForm extends Component {
  onSubmit = values => {
    // console.log('onSubmit: values: ', values);
  };

  render() {
    const { step, nextStep, prevStep, handleSubmit } = this.props;
    return (
      <>
        <h1>Account Setup</h1>
        <Step.Group className='account-steps' size='mini' ordered>
          <Step active={step === 1} completed={step > 1}>
            <Step.Content>
              <Step.Title>Company Info</Step.Title>
            </Step.Content>
          </Step>

          <Step active={step === 2} completed={step > 2}>
            <Step.Content>
              <Step.Title>Contact Info</Step.Title>
            </Step.Content>
          </Step>

          <Step active={step === 3} completed={step > 3}>
            <Step.Content>
              <Step.Title>Plan Selection</Step.Title>
            </Step.Content>
          </Step>

          <Step active={step === 4} completed={step > 4}>
            <Step.Content>
              <Step.Title>Review</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        <hr />
        <Form onSubmit={handleSubmit(this.onSubmit)} className='form-container my-5' autoComplete='off'>
          {step === 1 && (
            <>
              <label>Type</label>
              <Field
                name='type'
                component={SelectInput}
                options={typeOptions}
                label='Organization Type'
                placeholder='Select Type...'
              />
              <label>Size</label>
              <Field
                name='size'
                component={SelectInput}
                options={sizeOptions}
                label='Organization Size'
                placeholder='Select Size...'
              />
            </>
          )}
          {step === 2 && (
            <>
              <label>Full Name</label>
              <Field name='displayName' type='text' component={TextInput} />
              <label>Email</label>
              <Field name='email' type='text' component={TextInput} />
              <label>Password</label>
              <Field name='password' type='password' component={TextInput} />
            </>
          )}
          {step === 3 && (
            <>
              <label>Company Name</label>
              <Field name='company' type='text' component={TextInput} />
              <label>Address</label>
              <Field name='address' type='text' component={TextInput} />
              <div className='flex-box'>
                <div className='flex-6 pr-3'>
                  <label>City</label>
                  <Field name='city' type='text' component={TextInput} />
                </div>
                <div className='flex-2'>
                  <label>State</label>
                  <Field name='state' type='text' component={TextInput} />
                </div>
                <div className='flex-3 pl-3'>
                  <label>Zip</label>
                  <Field name='zip' type='text' component={TextInput} />
                </div>
              </div>
              <label>Phone</label>
              <Field name='phone' type='text' component={TextInput} />
            </>
          )}
          {step === 4 && (
            <>
              <div>
                School/District Size: <Field name='student' type='text' component={TextInput} /> students
              </div>
            </>
          )}
          {step === 5 && <div>step 5</div>}
          <div className='flex-box between'>
            {step > 1 && step < 5 && (
              <Button type='button' onClick={prevStep}>
                prev
              </Button>
            )}
            {step < 4 && (
              <Button type='button' onClick={nextStep}>
                next
              </Button>
            )}
            {step === 5 && <Button type='submit'>submit</Button>}
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'accountForm', validate })(withRouter(AccountForm)));
