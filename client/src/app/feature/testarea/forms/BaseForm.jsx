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

export class BaseForm extends Component {
  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    console.log('recaptcha token: ', recaptchaToken);
  };

  render() {
    const { handleSubmit, loading, loadingName } = this.props;
    return (
      <Form className='organization-form' onSubmit={handleSubmit(this.onFormSubmit)} autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='create-organization' verifyCallback={this.verifyCallback} />
        <label>Email</label>
        <Field name='name' size='mini' component={TextInput} type='text' />
        <div className='pt-2'>
          <Button color='green' loading={loadingName === 'create-organization' && loading} content={'Create Company'} />
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'organizationForm', validate })(BaseForm));
