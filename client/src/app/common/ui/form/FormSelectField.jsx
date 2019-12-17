import React, { useState, createRef } from 'react';
import { Form } from 'semantic-ui-react';

const FormSelectField = ({ input, label, options, placeholder, meta: { touched, error } }) => {
  // console.log('input: ', input);
  // console.log('touched, error: ', touched, error);
  const ref = createRef();
  const [val, setVal] = useState('');
  const handleSelect = option => {
    console.log('handleSelect: option: ', option);
    setVal(option);
    ref.current.focus();
    ref.current.blur();
  };
  const handleKeyUp = () => {
    setVal(val);
  };
  return (
    <Form.Field>
      <div className={touched && error ? 'material-form-field material-form-field-invalid' : 'material-form-field'}>
        <input type='text' {...input} value={val} onChange={(e, data) => input.onChange(data)} ref={ref} placeholder={placeholder} onKeyUp={handleKeyUp} autoComplete='off' />
        <label className='material-form-field-label'>{label}</label>
        <ul className='material-dropdown' onClick={() => console.log('test')}>
          {options &&
            options.map((option, i) => (
              <li key={i.toString()} data={option} className={val === option ? 'material-dropdown-selected' : undefined} onClick={() => console.log(option)}>
                {option}
              </li>
            ))}
        </ul>
      </div>
    </Form.Field>
  );
};

export default FormSelectField;
