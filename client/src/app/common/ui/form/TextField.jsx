import React from 'react';
import { Form } from 'semantic-ui-react';

const TextField = ({ input, label, hint, type, placeholder, maxLength, meta: { touched, error } }) => {
  return (
    <Form.Field className={!!input.value ? 'input-wrap filled' : 'input-wrap'} error={touched && !!error}>
      {label && <label className='label'>{label}</label>}
      <input {...input} type={type} placeholder={placeholder} maxLength={maxLength} />
      {hint && <div className='hint'>{hint}</div>}
      {touched && error && <div className='error'>{error}</div>}
    </Form.Field>
  );
};

export default TextField;
