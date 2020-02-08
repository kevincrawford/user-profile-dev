import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerUser, setRecaptchaToken } from '../AuthActions';
import TextInput from '../../form/TextInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = {
  registerUser,
  setRecaptchaToken
};

const validate = values => {
  const errors = {};
  let isEmp = values.isEmployer === 'yes';
  if (!values.displayName) {
    errors.displayName = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = 'Email must be valid address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.age = 'Password must be 8 characters or more';
  }
  if (isEmp && !values.organization) {
    errors.organization = 'Company name is required';
  }
  if (isEmp && !values.street) {
    errors.street = 'Company address is required';
  }
  if (isEmp && !values.city) {
    errors.city = 'Company city is required';
  }
  if (isEmp && !values.state) {
    errors.state = 'Company state is required';
  }
  if (isEmp && !values.zip) {
    errors.zip = 'Company zip is required';
  }
  if (isEmp && !values.phone) {
    errors.phone = 'Company phone is required';
  }
  return errors;
};

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, isEmployer: 'no', roles: ['reader'] };
    console.log('props: ', this.props);
  }

  next = isEmployer => {
    console.log('isEmployer: ', isEmployer);
    console.log('this.state.isEmployer: ', this.state.isEmployer);
    if (isEmployer !== this.state.isEmployer) {
      this.props.change('isEmployer', isEmployer);
      const roles =
        isEmployer === 'yes'
          ? ['reader', 'client-admin', 'client-user']
          : ['reader'];
      this.props.change('roles', roles);
    }
    let step = this.state.step;
    if (isEmployer === 'no' && step === 1) {
      step = 2;
    }
    this.setState({
      ...this.state,
      isEmployer: isEmployer,
      step: step + 1
    });
  };

  prev = isEmployer => {
    let step = this.state.step;
    if (isEmployer === 'no' && step === 3) {
      step = 2;
    }
    this.setState({
      ...this.state,
      isEmployer: isEmployer,
      step: step - 1
    });
  };

  onLoginSubmit = values => {
    if (!this.props.isPasswordForgot) {
      return this.props.login(values);
    } else {
      this.props.requestResetInstructions(values);
    }
  };

  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const {
      registerUser,
      handleSubmit,
      error,
      invalid,
      subbmitting
    } = this.props;
    return (
      <Form
        className='form-container'
        onSubmit={handleSubmit(this.onFormSubmit)}
        size='mini'
        autoComplete='off'
      >
        <ReCaptcha
          sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M'
          action='register_user'
          verifyCallback={this.verifyCallback}
        />
        {this.state.step === 1 && (
          <div>
            <h6 className='mt-0 pt-0'>Tell Us About Yourself</h6>
            <div onClick={() => this.next('no')}>
              I'm a Special Education Teacher, Student or Family Member
            </div>
            <div onClick={() => this.next('yes')}>
              I'm a Special Education Employer
            </div>
          </div>
        )}
        {this.state.isEmployer && this.state.step === 2 && (
          <>
            <h6 className='mt-0 pt-0'>Tell Us About Your Company</h6>
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
            <div className='pt-2'>
              <Button
                type='button'
                onClick={() => this.prev(this.state.isEmployer)}
                color='blue'
                content={'Previous'}
              />
              <Button
                type='button'
                onClick={() => this.next(this.state.isEmployer)}
                disabled={invalid}
                color='green'
                content={'next'}
              />
            </div>
          </>
        )}
        {this.state.step === 3 && (
          <>
            <h6 className='mt-0 pt-0'>Create Your Account</h6>
            <label>Full Name</label>
            <Field name='displayName' type='text' component={TextInput} />
            <label>Email</label>
            <Field name='email' type='text' component={TextInput} />
            <label>Password</label>
            <Field name='password' type='password' component={TextInput} />
            <div className='pt-2'>
              <Button
                type='submit'
                onClick={() => this.prev(this.state.isEmployer)}
                color='blue'
                content={'Create Account'}
              />
            </div>
          </>
        )}
        <Field
          name='isEmployer'
          component={TextInput}
          type='hidden'
          value={this.state.isEmployer}
          style={{ height: 0 }}
        />
        <Field
          name='roles'
          component={TextInput}
          type='hidden'
          value={this.state.roles}
          style={{ height: 0 }}
        />
      </Form>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));

/*
      <Form
        className='register-form'
        onSubmit={handleSubmit(registerUser)}
        size='small'
        autoComplete='off'
      >
        <ReCaptcha
          sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M'
          action='signup'
          verifyCallback={this.verifyCallback}
        />
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
          <div className='grow small pl-3'>
            <p>
              By clicking "Sign Up" I agree to the{' '}
              <a
                href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                Terms of Use
              </a>{' '}
              and acknowledge I have read the{' '}
              <a
                href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5'
                target='_blank'
                rel='noopener noreferrer'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </Form>
*/
