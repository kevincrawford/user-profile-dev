import React from 'react';
import { Field } from 'redux-form';

import TagInput from '../../../common/ui/form/TagInput';
import RadioGroupInput from '../../../common/ui/form/RadioGroupInput';

const QuestionType = ({ categories }) => {
  const options = {
    key: '_id',
    label: 'text',
    data: categories
  };
  // console.log('QuestionType: options: ', options);
  return (
    <div>
      <div className='text-center mb-5'>
        <h2 className='m-0'>What type of question do you have?</h2>
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
      <div className='mt-3'>
        <h5>
          <strong>2. </strong>Add tags to help the right people find and answer your question.
        </h5>
        <Field name='tags' component={TagInput} placeholder='eg test' />
      </div>
    </div>
  );
};

export default QuestionType;
