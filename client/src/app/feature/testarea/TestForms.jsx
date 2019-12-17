import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { combineValidators, isRequired, composeValidators, createValidator, hasLengthGreaterThan } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import SelectInput from '../../common/ui/form/SelectInput';
import TextField from '../../common/ui/form/TextField';
// import BuyBasic from './BuyBasic';
// import './cardElement.css';

// basic: prod_GKovdKbn2RxViK

const mapState = state => ({});

const actions = {};

const typeOptions = [
  { text: 'Type 1', value: '1' },
  { text: 'Type 2', value: '2' },
  { text: 'Type 3', value: '3' }
];

const sizeOptions = [
  { text: 'Big', value: '1' },
  { text: 'Small', value: '2' }
];

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  'Invalid email address'
);

const validate = combineValidators({
  type: isRequired({ message: 'Type is required' }),
  size: isRequired({ message: 'Size is required' }),
  displayName: isRequired({ message: 'Your Name is required' }),
  email: composeValidators(
    isRequired({ message: 'Email is required' }),
    isValidEmail({
      message: 'Email is Invalid'
    })
  )(),
  password: composeValidators(
    isRequired({ message: 'Password is required' }),
    hasLengthGreaterThan(7)({
      message: 'Password must be 8 characters minimum'
    })
  )()
});

export class TestForms extends Component {
  onSubmit = values => {
    console.log('onSubmit: values: ', values);
  };

  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    alert(token, addresses);
  };
  render() {
    const { handleSubmit, values } = this.props;
    return (
      <>
        <h3>Form Parts</h3>
        <Form className='form-container' autoComplete='off' onSubmit={handleSubmit(this.onSubmit)}>
          <section>
            <h4>signup</h4>
            <hr />
            <label>Type</label>
            <Field name='type' component={SelectInput} options={typeOptions} label='Organization Type' placeholder='Select Type...' />
            <label>Size</label>
            <Field name='size' component={SelectInput} options={sizeOptions} label='Organization Size' placeholder='Select Size...' />
            <hr />
          </section>
          <section>
            <h4>signup</h4>
            <hr />
            <Field name='displayName' label={'Your Name'} component={TextField} />
            <Field name='email' label={'Email'} hint={'Candidates that apply to your job will be sent to this email'} component={TextField} />
            <Field name='password' label={'Create Password'} hint={'Minimum 8 characters'} component={TextField} />
            <hr />
          </section>
          <section>
            <h4>payment</h4>
            <hr />
            stop
            <hr />
          </section>
          <Button>Submit</Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <hr />
        </Form>
      </>
    );
  }
}

export default withRouter(connect(mapState, actions)(reduxForm({ form: 'testForm', validate })(TestForms)));
