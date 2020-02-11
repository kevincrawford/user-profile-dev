/* eslint no-useless-escape: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerUser, setRegisterStep, setIsEmployer, setRecaptchaToken } from '../../common/ui/auth/AuthActions';
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators, createValidator } from 'revalidate';
import TextInput from '../../common/ui/form/TextInput';
import CheckBoxInput from '../../common/ui/form/CheckBoxInput';

const mapState = state => ({
  registerStep: state.auth.registerStep,
  isEmployer: state.auth.isEmployer,
  returnPath: state.auth.returnPath
});

const actions = { registerUser, setIsEmployer, setRegisterStep, setRecaptchaToken };

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

export class RegisterPage extends Component {
  onFormSubmit = async values => {
    console.log('values: ', values);
    if (this.props.registerStep === 1) {
      await this.props.registerUser(values);
      console.log('!!values.isEmployer: ', !!values.isEmployer);
      if (!!values.isEmployer) {
        this.props.setRegisterStep(2);
      } else {
        console.log('done: return to last page');
      }
    } else {
      this.props.registerOrg(values);
    }
  };

  onFormSubmit = values => {
    console.log('values: ', values);
    this.props.registerUser(values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  setEmployer = e => {
    console.log('setEmployer:');
    this.props.setIsEmployer(!this.props.isEmployer);
  };

  render() {
    const { handleSubmit, invalid, submitting, isEmployer, registerStep, setRegisterStep } = this.props;
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} autoComplete='off'>
        <h1 className='pb-3'>Create a Free Account</h1>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='register_user' verifyCallback={this.verifyCallback} />
        {registerStep === 1 && (
          <>
            <label>Name</label>
            <Field name='displayName' type='text' component={TextInput} />
            <label>Email</label>
            <Field name='email' type='text' component={TextInput} />
            <label>Create Password</label>
            <Field name='password' type='password' component={TextInput} />
            <Field name='isEmployer' label="I'm a Special Education Employer" component={CheckBoxInput} onClick={e => this.setEmployer()} />
          </>
        )}
        {registerStep === 2 && (
          <>
            <h5 className='mt-0 pt-0'>Tell Us About Your Company</h5>
            <label>Company Name</label>
            <Field name='organization' component={TextInput} type='text' />
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
          </>
        )}
        {registerStep === 1 && !isEmployer && (
          <Button disabled={invalid} loading={submitting} color='green'>
            Sign Up
          </Button>
        )}
        {registerStep === 1 && isEmployer && (
          <Button disabled={invalid} color='green' onClick={() => setRegisterStep(2)}>
            Continue
          </Button>
        )}
        {registerStep === 2 && (
          <Button disabled={invalid} loading={submitting} color='green'>
            Sign Up
          </Button>
        )}

        <hr className='mb-1 mt-3' />
        <p className='mt-0 small'>
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
        <a className='small' href='/login'>
          Have an Account?&nbsp;&nbsp;Login
        </a>
      </Form>
    );
  }
}

export default withRouter(connect(mapState, actions)(reduxForm({ form: 'registerForm', validate })(RegisterPage)));
