/* eslint no-useless-escape: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { setRecaptchaToken } from '../../common/ui/auth/AuthActions';
import { registerOrg } from './AdminActions';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators, createValidator } from 'revalidate';
import TextInput from '../../common/ui/form/TextInput';

export class AdminLanding extends Component {
  onFormSubmit = values => {
    this.props.registerOrg(values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='create_org' verifyCallback={this.verifyCallback} />
        <h1>
          Start Hiring. <em>Fast.</em>
        </h1>
        <h5>Tell Us About Your Company</h5>
        <label>Company Name</label>
        <Field name='name' component={TextInput} type='text' />
        <label>Address</label>
        <Field name='street' component={TextInput} type='text' />
        <div className='flex-box sm pb-3'>
          <div className='grow city'>
            <label>City</label>
            <Field name='city' component={TextInput} type='text' />
          </div>
          <div className='state'>
            <label>State</label>
            <Field name='state' component={TextInput} type='text' />
          </div>
          <div className='zip'>
            <label>Zip</label>
            <Field name='zip' component={TextInput} type='text' />
          </div>
        </div>
        <div className='phone'>
          <label>Phone</label>
          <Field name='phone' component={TextInput} type='text' />
          <label>Website</label>
          <Field name='website' component={TextInput} type='text' />
        </div>
        <h5>Tell Us About Yourself</h5>
        <label>Name</label>
        <Field name='displayName' type='text' component={TextInput} />
        <label>Email</label>
        <Field name='email' type='text' component={TextInput} />
        <label>Create Password</label>
        <Field name='password' type='password' component={TextInput} />
        <div className='py-3'>
          <Button disabled={invalid} loading={submitting} color='green'>
            Sign Up
          </Button>
        </div>
        <hr className='mb-0' />
        <p className='small mt-0'>
          By clicking "Sign Up" you agree to the SPEDxchange{' '}
          <a href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53' target='_blank' rel='noopener noreferrer'>
            Terms of Use
          </a>{' '}
          and{' '}
          <a href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5' target='_blank' rel='noopener noreferrer'>
            Privacy Policy
          </a>
          .
        </p>
        <span className='link small mt-0' onClick={this.handleSwitchModal}>
          Have an Account?&nbsp;&nbsp;Login
        </span>
      </Form>
    );
  }
}

const isValidEmail = createValidator(
  message => value => {
    if (
      value &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
    ) {
      return message;
    }
  },
  'Invalid email address'
);

const validate = combineValidators({
  displayName: isRequired({ message: 'Your Name is required' }),
  email: composeValidators(isRequired({ message: 'Email is required' }), isValidEmail({ message: 'Invalid Email' }))(),
  password: composeValidators(
    isRequired({ message: 'Password is required' }),
    hasLengthGreaterThan(7)({
      message: 'Password must be 8 characters or more'
    })
  )(),
  name: isRequired({ message: 'Company name is required' }),
  street: isRequired({ message: 'Company address is required' }),
  city: isRequired({ message: 'Company city is required' }),
  state: isRequired({ message: 'Company state is required' }),
  zip: isRequired({ message: 'Company zip is required' }),
  phone: isRequired({ message: 'Company phone is required' }),
  website: isRequired({ message: 'Company website is required' })
});

const mapState = state => ({
  auth: state.auth
});

const actions = {
  setRecaptchaToken,
  registerOrg
};

export default connect(mapState, actions)(reduxForm({ form: 'registerOrgForm', validate })(AdminLanding));
