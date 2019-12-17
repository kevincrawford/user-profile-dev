/* eslint no-useless-escape: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators, createValidator } from 'revalidate';
import { registeredUser } from '../AuthActions';
import TextInput from '../../form/TextInput';
import CheckBoxInput from '../../form/CheckBoxInput';

const actions = {
  registeredUser
};

const isConfirmed = createValidator(
  message => value => {
    if (!value || value === false) {
      return message;
    }
  },
  field => `${field} must be confirmed`
);

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
  confirm: composeValidators(isConfirmed({ message: 'confirm' }))()
});

const verifyCallback = recaptchaToken => {
  // console.log(recaptchaToken, '<= your recaptcha token');
};

const RegisterForm = ({ handleSubmit, registeredUser, error, invalid, subbmitting }) => {
  return (
    <div>
      <Form className='register-form' onSubmit={handleSubmit(registeredUser)} size='small' autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='signup' verifyCallback={verifyCallback} />
        <label>Full Name</label>
        <Field name='displayName' type='text' component={TextInput} />
        <label>Email</label>
        <Field name='email' type='text' component={TextInput} />
        <label>Password</label>
        <Field name='password' type='password' component={TextInput} />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <hr />
        <div className='flex-box'>
          <div>
            <Button disabled={invalid || subbmitting} color='green'>
              Sign Up
            </Button>
          </div>
          <div className='confirmCheck'>
            <Field name='confirm' component={CheckBoxInput} />
          </div>
          <div className='grow small'>
            <p>
              By clicking "Sign Up" I agree to the{' '}
              <a href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53' target='_blank' rel='noopener noreferrer'>
                {' '}
                Terms of Use
              </a>{' '}
              and acknowledge I have read the{' '}
              <a href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate, initialValues: {} })(RegisterForm));
