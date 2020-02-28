import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';

import DateInput from '../../../../common/ui/form/DateInput';
import TextInput from '../../../../common/ui/form/TextInput';
import SelectInput from '../../../../common/ui/form/SelectInput';
import EditorInput from '../../../../common/ui/form/EditorInput';

import './AdminJob.scss';

const mapState = state => ({});

const actions = {};

const validate = combineValidators({
  content: composeValidators(
    isRequired({ message: 'Answer is required' }),
    hasLengthGreaterThan(60)({
      message: 'Please provide more detail in your answer.'
    })
  )()
});

const typeOptions = [
  { key: 'm', text: 'Type 1', value: '1' },
  { key: 'f', text: 'Type 2', value: '2' },
  { key: 'o', text: 'Type 3', value: '3' }
];

const salaryOptions = [
  { key: 'm', text: 'Year', value: '1' },
  { key: 'f', text: 'Hour', value: '2' },
  { key: 'o', text: 'Day', value: '3' }
];

export class AdminJobForm extends Component {
  componentDidMount() {
    if (this.props.match.params !== 'new') {
      console.log('lookup job');
    }
  }

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <div>breadcrumbs</div>
        <Form onSubmit={handleSubmit(this.onSubmit)} autoComplete='off'>
          <div className='job-edit flex-box sm'>
            <div className='grow'>
              <div className='flex-box between sm mb-3'>
                <div className='half'>
                  <label>Job ID</label>
                  <Field name='jobId' component={TextInput} type='text' />
                </div>
                <div className='half'>
                  <label>Job Administartor</label>
                  <Field name='admin' component={SelectInput} options={typeOptions} placeholder='Select Type...' />
                </div>
              </div>
              <div className='flex-box between sm mb-3'>
                <div className='half'>
                  <label>title</label>
                  <Field name='title' component={TextInput} type='text' />
                </div>
                <div className='half'>
                  <label>Job Type</label>
                  <Field name='type' component={SelectInput} options={typeOptions} placeholder='Select Type...' />
                </div>
              </div>
              <div className='flex-box between sm mb-3'>
                <div className='half'>
                  <label>Location</label>
                  <Field name='location' component={SelectInput} options={typeOptions} placeholder='Select Type...' />
                </div>
                <div className='half'>
                  <label>Salary</label>
                  <div className='flex-box'>
                    <div className='grow'>$</div>
                    <div className='per'>/</div>
                    <div className='period'>
                      <Field name='salaryPeriod' component={SelectInput} options={salaryOptions} placeholder='Select...' />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label>Summary</label>
                <Field name='summary' component={TextInput} type='text' />
              </div>
              <div>
                <label>Summary</label>
                <Field name='description' component={EditorInput} />
              </div>
            </div>
            <div className='spacer'></div>
            <div className='publish'>
              <div className='mt-2'>status</div>
              <div className='flex-box between mb-3'>
                <div className='half'>
                  <Button color='gray' content='preview' />
                </div>
                <div className='half'>
                  <Button color='blue' content='save' />
                </div>
              </div>
              <Button color='green' content='Publish' />
              <Field name='publish date' component={DateInput} />
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'adminJobForm', validate })(AdminJobForm));
