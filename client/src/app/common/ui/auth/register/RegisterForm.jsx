/* eslint no-useless-escape: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators, createValidator } from 'revalidate';
import { registerUser, setRecaptchaToken } from '../AuthActions';
import { openModal, closeModal } from '../../modal/ModalActions';
import TextInput from '../../form/TextInput';
import CheckBoxInput from '../../form/CheckBoxInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = {
  registerUser,
  setRecaptchaToken,
  openModal,
  closeModal
};

const isValidEmail = createValidator(
  message => value => {
    if (
      value &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        value
      )
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
  )()
});

export class RegisterForm extends Component {
  componentDidMount() {
    // console.log('RegisterForm: props: ', this.props);
    if (this.props.config && this.props.config.postJobs) {
      this.props.change('isEmployer', true);
    }
  }

  onRegisterSubmit = values => {
    this.props.registerUser(values);
  };

  handleSwitchModal = () => {
    this.props.closeModal();
    this.props.openModal('LoginModal');
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { handleSubmit, error, invalid, subbmitting, config } = this.props;
    return (
      <Form className='register-form' onSubmit={handleSubmit(this.onRegisterSubmit)} autoComplete='off'>
        <ReCaptcha
          sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M'
          action='signup'
          verifyCallback={this.verifyCallback}
        />
        {config && config.postJobs && (
          <Field name='isEmployer' component={TextInput} type='hidden' style={{ height: 0 }} />
        )}
        <label>Name</label>
        <Field name='displayName' type='text' component={TextInput} />
        <label>Email</label>
        <Field name='email' type='text' component={TextInput} />
        <label>Create Password</label>
        <Field name='password' type='password' component={TextInput} />
        {!config && <Field name='isEmployer' label="I'm a Special Education Employer" component={CheckBoxInput} />}
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <div className='pt-3'>
          <Button disabled={invalid} loading={subbmitting} color='green'>
            Sign Up
          </Button>
        </div>
        <hr className='mb-0' />
        <p className='small mt-0'>
          By clicking "Sign Up" you agree to the SPEDxchange{' '}
          <a
            href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53'
            target='_blank'
            rel='noopener noreferrer'>
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5'
            target='_blank'
            rel='noopener noreferrer'>
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

export default connect(mapState, actions)(reduxForm({ form: 'registerForm', validate })(withRouter(RegisterForm)));
