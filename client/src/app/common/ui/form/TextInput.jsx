import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';

const TextInput = ({
  input,
  type,
  placeholder,
  maxLength,
  icon,
  iconPosition,
  label,
  labelPosition,
  meta: { touched, error }
}) => {
  return (
    <Form.Field className='testing' error={touched && !!error}>
      <Input
        {...input}
        type={type}
        icon={icon}
        iconPosition={iconPosition}
        label={label}
        labelPosition={labelPosition}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
