import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';

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
              <div className='flex-box between sm'>
                <div className='half sm'>jobid</div>
                <div className='half sm'>admin</div>
              </div>
              <div className='flex-box between sm'>
                <div className='half sm'>title</div>
                <div className='half sm'>type</div>
              </div>
              <div className='flex-box between sm'>
                <div className='half sm'>location</div>
                <div className='half sm'>salary</div>
              </div>
              <div>summary</div>
              <div>description</div>
            </div>
            <div className='spacer'></div>
            <div className='publish'>
              <div className='flex-box between mb-2'>
                <Button className='half' color='gray' content='preview' />
                <Button className='half' color='blue' content='save' />
              </div>
              <Button color='green' content='Publish' />
              <div className='mt-2'>status</div>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'adminJobForm', validate })(AdminJobForm));
