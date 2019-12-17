import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextInput = ({ input, type, placeholder, maxLength, meta: { touched, error } }) => {
  return (
    <Form.Field className='testing' error={touched && !!error}>
      <input {...input} type={type} placeholder={placeholder || null} maxLength={maxLength || null} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
