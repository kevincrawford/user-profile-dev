import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button, Label } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { updatePassword } from '../AuthActions';
import TextInput from '../../form/TextInput';
import HiddenInput from '../../form/HiddenInput';

const mapState = (state, ownProps) => {
  const token = ownProps.token;
  return {
    loading: state.async.loading,
    loadingName: state.async.elementName,
    initialValues: {
      token: token
    }
  };
};

const actions = {
  updatePassword
};

const validate = combineValidators({
  newPassword: isRequired({ message: 'New Password is required' }),
  verifyPassword: isRequired({ message: 'Verify Password is required' })
});

export class ResetForm extends Component {
  verifyCallback = recaptchaToken => {
    // console.log(recaptchaToken, '<= your recaptcha token');
  };

  render() {
    const { loading, loadingName, updatePassword, handleSubmit, error } = this.props;
    return (
      <Form className='register-form' onSubmit={handleSubmit(updatePassword)} autoComplete='off'>
        <Field name='token' component={HiddenInput} />
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='resetPasswordRequest' verifyCallback={this.verifyCallback} />
        <label>New Password</label>
        <Field name='newPassword' component={TextInput} type='text' />
        <label>Confirm Password</label>
        <Field name='verifyPassword' component={TextInput} type='text' />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <Button color='green' loading={loadingName === 'update-password' && loading} content='Reset Password' />
      </Form>
    );
  }
}

export default withRouter(connect(mapState, actions)(reduxForm({ form: 'resetPasswordForm', validate })(ResetForm)));
