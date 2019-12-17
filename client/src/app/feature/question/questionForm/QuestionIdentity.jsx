import React from 'react';
import RadioGroupInput from '../../../common/ui/form/RadioGroupInput';

const options = (options = {
  key: 'key',
  label: 'name',
  data: [
    {
      key: 0,
      name: "I'm a SPED Student"
    },
    {
      key: 1,
      name: "I'm a SPED Teacher"
    },
    {
      key: 2,
      name: "I'm a SPED Administrator"
    },
    {
      key: 3,
      name: "I'm a Parent"
    },
    {
      key: 5,
      name: "I'm interested in Special Education"
    }
  ]
});
const QuestionIdentity = () => {
  return (
    <div>
      <div className='text-center mb-5'>
        <h2 className='m-0'>Tell Us About Yourself</h2>
        <p className='mt-2'>We’ll help you find the best way to get your answer.</p>
      </div>
      <div>
        <h5>
          <strong>1. </strong>Select a SPED discipline that is most relevant to your question.
        </h5>
        <div className='columns'>
          <Field name='category' options={options} component={RadioGroupInput} />
        </div>
      </div>
    </div>
  );
};

export default QuestionIdentity;
