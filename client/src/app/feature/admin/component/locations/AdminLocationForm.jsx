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

export class AdminLocationForm extends Component {
  componentDidMount() {
    if (this.props.match.params !== 'new') {
      // console.log('lookup job');
    }
  }

  onFormSubmit = values => {
    // console.log('values: ', values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <div>breadcrumbs</div>
        <Form onSubmit={handleSubmit(this.onFormSubmit)} size='mini' autoComplete='off'>
          <div className='flex-box sm job-edit'>
            <div className='grow'>Edit</div>
            <div className='publish'>Publish</div>
          </div>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'adminLocationForm', validate })(AdminLocationForm));
