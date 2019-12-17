import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import validate from './validate';
import FormSelectField from '../../../common/ui/form/FormSelectField';

const typeOptions = ['type 1', 'type 2', 'type 3', 'type 4', 'type 5', 'type 6', 'type 7'];
const sizeOptions = ['big', 'small'];

const AccountStep1Type = props => {
  const { onSubmit } = props;
  return (
    <>
      <h1>step 1</h1>
      <div onClick={onSubmit}>next</div>
      <hr />
      <form onSubmit={onSubmit}>
        <Field name='type' component={FormSelectField} options={typeOptions} label='Organization Type' placeholder='Select Type...' />
        <Field name='size' component={FormSelectField} options={sizeOptions} label='Organization Size' placeholder='Select Size...' />
        <div>
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: 'accountForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AccountStep1Type);
