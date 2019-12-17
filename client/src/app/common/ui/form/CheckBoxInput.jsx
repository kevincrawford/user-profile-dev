import React from 'react';
import { Form } from 'semantic-ui-react';

const CheckBoxInput = ({ input }) => {
  return (
    <Form.Field>
      <input {...input} type='checkbox' />
    </Form.Field>
  );
};

export default CheckBoxInput;
