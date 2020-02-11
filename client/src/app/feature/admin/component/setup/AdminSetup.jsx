import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { setRecaptchaToken } from '../../../../common/ui/auth/AuthActions';

import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../../common/ui/form/TextInput';

export class AdminSetup extends Component {
  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='create_org' verifyCallback={this.verifyCallback} />
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
        <div className='mt-2'>
          <Button disabled={invalid} loading={submitting} color='green'>
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

const validate = combineValidators({
  name: isRequired({ message: 'Company name is required' }),
  street: isRequired({ message: 'Company address is required' }),
  city: isRequired({ message: 'Company city is required' }),
  state: isRequired({ message: 'Company state is required' }),
  zip: isRequired({ message: 'Company zip is required' }),
  phone: isRequired({ message: 'Company phone is required' }),
  website: isRequired({ message: 'Company website is required' })
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  setRecaptchaToken
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'registerOrgForm', validate })(AdminSetup));
