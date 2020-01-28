import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/ui/form/TextInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = {};

const validate = combineValidators({
  name: isRequired({ message: 'Name is required' })
});

export class OrganizationUserForm extends Component {
  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    console.log('recaptcha token: ', recaptchaToken);
  };

  render() {
    const { handleSubmit, loading, loadingName } = this.props;
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} size='mini' autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='organization_user' verifyCallback={this.verifyCallback} />
        <div className='flex-box between pb-3'>
          <div className='half'>
            <label>First Name</label>
            <Field name='firstName' size='mini' component={TextInput} type='text' />
          </div>
          <div className='half'>
            <label>Last Name</label>
            <Field name='lastName' size='mini' component={TextInput} type='text' />
          </div>
        </div>
        <label>Email</label>
        <Field name='email' size='mini' component={TextInput} type='text' />
        <div className='flex-box pb-3'>
          <div className='half'>
            <label>Phone</label>
            <Field name='phone' size='mini' component={TextInput} type='text' />
          </div>
          <div className='half'>&nbsp;</div>
        </div>

        <div className='pt-2'>
          <Button type='submit' color='green' loading={loadingName === 'create-organization-user' && loading} content={'Add User'} />
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'organizationUserForm', validate })(OrganizationUserForm));
