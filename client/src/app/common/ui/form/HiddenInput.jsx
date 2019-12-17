import React from 'react';
import { Form } from 'semantic-ui-react';

const HiddenInput = ({ input }) => {
  return (
    <Form.Field>
      <input {...input} type='hidden' />
    </Form.Field>
  );
};

export default HiddenInput;
