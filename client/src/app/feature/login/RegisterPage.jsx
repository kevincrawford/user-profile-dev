import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  identity: state.auth.identity
});

const mapDispatchToProps = {};

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
  )()
});

export class RegisterPage extends Component {
  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { identity, handleSubmit, loading, loadingName } = this.props;
    if (!identity)
      return (
        <div>
          <h3>Tell Us About Yourself</h3>
          <div>I'm a Special Educator</div>
          <div>I'm a Special Education Employer</div>
        </div>
      );
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} size='mini' autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='create_organization' verifyCallback={this.verifyCallback} />
        <label>Full Name</label>
        <Field name='displayName' type='text' component={TextInput} />
        <label>Email</label>
        <Field name='email' type='text' component={TextInput} />
        <label>Password</label>
        <Field name='password' type='password' component={TextInput} />
        <hr />
        <label>Company Name</label>
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
          <label>Website</label>
          <Field name='phone' component={TextInput} type='text' />
        </div>
        <div className='pt-2'>
          <Button color='green' loading={loadingName === 'create-organization' && loading} content={'Create Company'} />
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'registerForm', validate })(RegisterPage));
