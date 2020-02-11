import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

const CheckBoxInput = ({ input, label }) => {
  return (
    <Form.Field>
      <Checkbox label={label} checked={input.value ? true : false} onChange={(e, { checked }) => input.onChange(checked)} />
    </Form.Field>
  );
};

export default CheckBoxInput;
