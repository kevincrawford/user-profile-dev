import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form } from 'semantic-ui-react';

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
    this.props.history.push('/');
    if (this.props.match.params !== 'new') {
      // console.log('lookup job');
    }
  }

  onSubmit = values => {
    // console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <div>breadcrumbs</div>
        <Form onSubmit={handleSubmit(this.onSubmit)} autoComplete='off'>
          <div className='job-edit flex-box sm'>
            <div className='grow'>
              <div className='flex-box between md'>
                <div className='half'>jobid</div>
                <div className='half'>admin</div>
              </div>
              <div className='flex-box between md'>
                <div className='half'>title</div>
                <div className='half'>type</div>
              </div>
              <div className='flex-box between md'>
                <div className='half'>location</div>
                <div className='half'>salary</div>
              </div>
              <div>summary</div>
              <div>description</div>
            </div>
            <div className='spacer'></div>
            <div className='publish'>
              <div className='flex-box between md'>
                <div className='half'>preview</div>
                <div className='half'>save</div>
              </div>
              <div>publish</div>
              <div>status</div>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'adminJobForm', validate })(AdminJobForm));
