import React from 'react';
import { Form } from 'semantic-ui-react';

const FormTextField = ({ input, label, type, placeholder, maxLength, meta: { touched, error } }) => {
  return (
    <Form.Field error={touched && !!error}>
      <div className={touched && error ? 'material-form-field material-form-field-invalid' : 'material-form-field'} data={touched && error ? error : undefined}>
        <input {...input} type={type} placeholder={placeholder} maxLength={maxLength} />
        <label className='material-form-field-label'>{label}</label>
      </div>
    </Form.Field>
  );
};

export default FormTextField;
