import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button, Dropdown } from 'semantic-ui-react';

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

const jobTypeOptions = [
  { key: 'Full-time', text: 'Full-time', value: 'Full-time' },
  { key: 'Part-time', text: 'Part-time', value: 'Part-time' },
  { key: 'Contractor', text: 'Contractor', value: 'Contractor' },
  { key: 'Intern', text: 'Intern', value: 'Intern' },
  { key: 'Seasonal', text: 'Seasonal', value: 'Seasonal' }
];

const salaryPeriodOptions = [
  { key: 'Year', text: 'Year', value: 'Year' },
  { key: 'Hour', text: 'Hour', value: 'Hour' },
  { key: 'Day', text: 'Day', value: 'Day' }
];

export class AdminJobForm extends Component {
  componentDidMount() {
    console.log(this.props.auth);
    if (this.props.match.params !== 'new') {
      console.log('lookup job');
    }
  }

  onSubmit(values) {
    console.log(values);
  }

  onSalaryRangeSelect(e) {
    console.log(e.target.textContent);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
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
                  <Field name='admin' component={SelectInput} options={jobTypeOptions} placeholder='Select Type...' />
                </div>
              </div>
              <div className='flex-box between sm mb-3'>
                <div className='half'>
                  <label>title</label>
                  <Field name='title' component={TextInput} type='text' />
                </div>
                <div className='half'>
                  <label>Job Type</label>
                  <Field name='type' component={SelectInput} options={jobTypeOptions} placeholder='Select Type...' />
                </div>
              </div>
              <div className='flex-box between sm mb-3'>
                <div className='half'>
                  <label>Location</label>
                  <Field
                    name='location'
                    component={SelectInput}
                    options={jobTypeOptions}
                    placeholder='Select Type...'
                  />
                </div>
                <div className='half'>
                  <label>Salary</label>
                  <Field
                    name='salary'
                    icon='dollar sign'
                    iconPosition='left'
                    label={
                      <Dropdown
                        defaultValue='Year'
                        options={salaryPeriodOptions}
                        onChange={e => this.onSalaryRangeSelect(e)}
                      />
                    }
                    labelPosition='right'
                    component={TextInput}
                    type='text'
                  />
                  {/*
                   <div className='flex-box'>
                    <div>
                      <div className='h-100 flex-box center align-center'>$</div>
                    </div>
                    <div className='grow pl-1'>
                      <Field name='summary' component={TextInput} type='text' />
                    </div>
                    <div className='mx-1'>
                      <div className='h-100 flex-box center align-center'>/</div>
                    </div>
                    <div className='period'>
                      <Field
                        name='salaryPeriod'
                        component={SelectInput}
                        options={salaryOptions}
                        placeholder='Select...'
                      />
                    </div>                 

                  </div>
                  */}
                </div>
              </div>
              <div>
                <label>Summary</label>
                <Field name='summary' component={TextInput} type='text' />
              </div>
              <div className='mt-3'>
                <label className='my-0'>Description</label>
                <Field name='description' component={EditorInput} />
              </div>
            </div>
            <div className='spacer'></div>
            <div className='publish'>
              <label>&nbsp;</label>
              <div className='flex-box between mb-3'>
                <div className='half'>
                  <Button color='grey' content='preview' />
                </div>
                <div className='half'>
                  <Button color='blue' content='save' />
                </div>
              </div>
              {true ? <Button color='green' content='Publish' /> : <Button color='grey' content='Unpublish' />}
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'adminJobForm', validate })(AdminJobForm));
