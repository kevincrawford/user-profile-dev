import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { login, requestResetInstructions, toggleForgotPassword, setRecaptchaToken } from '../../common/ui/auth/AuthActions';
import TextInput from '../../common/ui/form/TextInput';

export class LoginPage extends Component {
  onLoginSubmit = values => {
    if (!this.props.isPasswordForgot) {
      return this.props.login(values);
    } else {
      this.props.requestResetInstructions(values);
    }
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { loading, loadingName, isPasswordForgot, toggleForgotPassword, handleSubmit, error } = this.props;
    return (
      <>
        <Form className='form-container register-form' size='small' onSubmit={handleSubmit(this.onLoginSubmit)} autoComplete='off'>
          <h1 className='pb-3'>Login</h1>
          <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='login' verifyCallback={this.verifyCallback} />
          <label>Email</label>
          <Field name='email' component={TextInput} type='text' />
          {!isPasswordForgot && (
            <>
              <label>Password</label>
              <Field name='password' component={TextInput} type='password' />
            </>
          )}
          {error && (
            <Label basic color='red'>
              {error}
            </Label>
          )}
          <div className='flex-box pt-2'>
            <div className='pr-3'>
              <Button color='green' loading={loadingName === 'request-password-reset' && loading} content={!isPasswordForgot ? 'Login' : 'Reset Password'} />
            </div>
            <div className='grow pt-2 text-right'>
              <span className='link' onClick={toggleForgotPassword}>
                {!isPasswordForgot ? 'Forgot Password?' : 'Login'}
              </span>
            </div>
          </div>
          <hr className='mb-1' />
          <a className='' href='/register'>
            Not a member? Create a Free Account
          </a>
        </Form>
      </>
    );
  }
}

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  isPasswordForgot: state.auth.isPasswordForgot
});

const actions = {
  login,
  requestResetInstructions,
  toggleForgotPassword,
  setRecaptchaToken
};

const validate = combineValidators({
  email: isRequired({ message: 'Email is required' }),
  password: isRequired({ message: 'Password is required' })
});

export default connect(mapState, actions)(reduxForm({ form: 'loginForm', validate })(LoginPage));
