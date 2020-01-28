import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/ui/form/TextInput';
import SelectInput from '../../../common/ui/form/SelectInput';

import './styles.scss';

const typeOptions = [
  { text: 'Type 1', value: '1' },
  { text: 'Type 2', value: '2' },
  { text: 'Type 3', value: '3' }
];

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = {};

const validate = combineValidators({
  name: isRequired({ message: 'Name is required' })
});

export class OrganizationLocationForm extends Component {
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
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='organization_location' verifyCallback={this.verifyCallback} />
        <label>Primary Contact</label>
        <Field name='type' component={SelectInput} options={typeOptions} label='Primary Contact' placeholder='Select Contact...' />
        <label>Location Name</label>
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
        </div>
        <div className='pt-2'>
          <Button color='green' loading={loadingName === 'create-organization' && loading} content={'Add Location'} />
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'organizationLocationForm', validate })(OrganizationLocationForm));
