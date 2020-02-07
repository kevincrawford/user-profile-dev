import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { registerUser, setRecaptchaToken } from '../../common/ui/auth/AuthActions';
import TextInput from '../../common/ui/form/TextInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = { registerUser, setRecaptchaToken };

const validate = values => {
  const errors = {};
  let isEmp = values.isEmployer === 'yes';
  if (!values.displayName) {
    errors.displayName = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)
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

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, isEmployer: false };
  }

  next = isEmployer => {
    if (isEmployer !== this.state.isEmployer) {
      this.props.change('isEmployer', isEmployer ? 'yes' : 'no');
    }
    let step = this.state.step;
    if (!isEmployer && step === 1) {
      step = 2;
    }
    this.setState({
      ...this.state,
      isEmployer: isEmployer,
      step: step + 1
    });
  };

  prev = isEmployer => {
    if (isEmployer !== this.state.isEmployer) {
      // this.props.dispatch(change('registerForm', 'isEmployer', isEmployer));
    }
    let step = this.state.step;
    if (!isEmployer && step === 3) {
      step = 2;
    }
    this.setState({
      ...this.state,
      isEmployer: isEmployer,
      step: step - 1
    });
  };

  onFormSubmit = values => {
    console.log('values: ', values);
  };

  verifyCallback = recaptchaToken => {
    this.props.setRecaptchaToken(recaptchaToken);
  };

  render() {
    const { handleSubmit, errors, invalid, loading, loadingName } = this.props;
    return (
      <Form className='form-container' onSubmit={handleSubmit(this.onFormSubmit)} size='mini' autoComplete='off'>
        <ReCaptcha sitekey='6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M' action='create_organization' verifyCallback={this.verifyCallback} />
        <Field name='isEmployer' component={TextInput} type='hidden' value={this.state.isEmployer ? 'yes' : 'no'} style={{ height: 0 }} />
        {this.state.step === 1 && (
          <div>
            <h3>Tell Us About Yourself</h3>
            <div onClick={() => this.next(false)}>I'm a Special Educator</div>
            <div onClick={() => this.next(true)}>I'm a Special Education Employer</div>
          </div>
        )}
        {this.state.isEmployer && this.state.step === 2 && (
          <>
            <h3>Tell Us About Your Company</h3>
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
              <Button type='button' onClick={() => this.prev(this.state.isEmployer)} color='blue' content={'Previous'} />
              <Button type='button' onClick={() => this.next(this.state.isEmployer)} disabled={invalid} color='green' content={'next'} />
            </div>
          </>
        )}
        {this.state.step === 3 && (
          <>
            <h3>Create Your Account</h3>
            <label>Full Name</label>
            <Field name='displayName' type='text' component={TextInput} />
            <label>Email</label>
            <Field name='email' type='text' component={TextInput} />
            <label>Password</label>
            <Field name='password' type='password' component={TextInput} />
            <div className='pt-2'>
              <Button type='button' onClick={() => this.prev(this.state.isEmployer)} color='blue' content={'Previous'} />
            </div>
          </>
        )}
        <div className='pt-2'>
          <div>isEmp: {this.state.isEmployer ? 'yes' : 'no'}</div>
          <div>step: {this.state.step}</div>
        </div>
        <div className='pt-2'>
          <div>errors: {errors ? 'yes' : 'no'}</div>
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'registerForm', validate })(RegisterPage));
