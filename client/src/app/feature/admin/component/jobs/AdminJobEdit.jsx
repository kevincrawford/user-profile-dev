import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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

export class AdminJobEdit extends Component {
  componentDidMount() {
    if (this.props.match.params !== 'new') {
      console.log('lookup job');
    }
  }

  onSubmit = values => {
    this.props.saveJob();
    setTimeout(() => {
      this.props.reload(this.props.question.uid, this.props.question.slug);
    }, 150);
  };


  render() {
    const {handleSubmit} = this.props;
    return (
      <>
        <div>breadcrumbs</div>
        <Form onSubmit={handleSubmit(this.onSubmit)} autoComplete='off'>
          <div className='flex-box sm job-edit'>
            <div className='grow'>edit</div>
            <div className='publish'>publish</div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'jobForm', validate })(AdminJobEdit));
