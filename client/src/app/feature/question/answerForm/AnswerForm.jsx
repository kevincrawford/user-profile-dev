import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { answerQuestion } from '../questionActions';
import { openModal } from '../../../common/ui/modal/ModalActions';
import EditorInput from '../../../common/ui/form/EditorInput';

const mapState = state => ({
  auth: state.auth
});

const actions = {
  answerQuestion,
  openModal
};

const validate = combineValidators({
  content: composeValidators(
    isRequired({ message: 'Answer is required' }),
    hasLengthGreaterThan(60)({
      message: 'Please provide more detail in your answer.'
    })
  )()
});

class AnswerForm extends Component {
  onSubmit = values => {
    // console.log('onSubmit', values);
    this.props.answerQuestion(this.props.question._id, values);
    setTimeout(() => {
      this.props.reload(this.props.question.uid, this.props.question.slug);
    }, 150);
  };

  onFormClick = () => {
    if (!this.props.auth.authenticated) {
      this.props.history.push(this.props.history.location);
      this.props.openModal('UnauthModal');
    }
  };

  render() {
    return (
      <>
        <h5 className='my-1'>Your Answer</h5>
        <hr />
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
          <Field name='content' click={this.onFormClick} component={EditorInput} />
          <Button positive disabled={!this.props.auth.authenticated} type='submit' className='mt-2 mb-5'>
            Submit Answer
          </Button>
        </Form>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'answerForm', validate })(withRouter(AnswerForm)));
