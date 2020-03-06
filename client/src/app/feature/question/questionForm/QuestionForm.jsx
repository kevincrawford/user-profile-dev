import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field, reset } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Form, Button, Icon } from 'semantic-ui-react';
import { createQuestion, updateQuestion } from '../questionActions';
import { handleEditorUpdate } from './actions/questionFormActions';
import { handleTabChange, handleSelectCategory, handleUpdateTagNames } from './actions/questionFormActions';
import { loadQuestionCategories } from '../../../common/actions/category/categoryActions';
import { loadQuestionBySlug } from '../questionActions';
import { openModal } from '../../../common/ui/modal/ModalActions';
import { createSlug } from '../../../common/util/createSlug';
import { createUid } from '../../../common/util/createUid';
import Loading from '../../../common/ui/loading/Loading';
import TextInput from '../../../common/ui/form/TextInput';
import EditorInput from '../../../common/ui/form/EditorInput';
import TagInput from '../../../common/ui/form/TagInput';
import RadioGroupInput from '../../../common/ui/form/RadioGroupInput';
import QuestionHints from './QuestionHints';
import QuestionPreview from './QuestionPreview';

const mapState = (state, ownProps) => {
  let hideAskModal = false;
  if (localStorage.hideAskModal) {
    const expires = new Date(localStorage.hideAskModal);
    const now = new Date();
    if (now < expires) {
      hideAskModal = true;
    } else {
      localStorage.removeItem('hideAskModal');
    }
  }

  return {
    loading: state.async.loading,
    hideAskModal: hideAskModal,
    questions: state.questions.questions,
    currentQuestion: state.questions.currentQuestion,
    currentUser: state.auth.currentUser,
    activeQuestionTab: state.questionForm.activeQuestionTab,
    tagNames: state.questionForm.tagsNames,
    categories: state.category.questionCategories,
    questionData: state.form.questionForm
  };
};

const actions = {
  reset,
  loadQuestionBySlug,
  loadQuestionCategories,
  handleEditorUpdate,
  handleTabChange,
  handleSelectCategory,
  handleUpdateTagNames,
  createQuestion,
  updateQuestion,
  openModal
};

const validate = combineValidators({
  category: isRequired({ message: 'Category is required' }),
  title: composeValidators(
    isRequired({ message: 'Question is required' }),
    hasLengthGreaterThan(20)({
      message: 'Please provide more Question details'
    })
  )(),
  content: composeValidators(
    isRequired({ message: 'Description is required' }),
    hasLengthGreaterThan(60)({
      message: 'Please provide more Description details'
    })
  )()
});

class QuestionForm extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.props.handleTabChange(1);
    this.props.reset('questionForm');

    if (!this.props.hideAskModal) {
      this.props.openModal('AskQuestionModal');
    }
    if (params.uid && params.slug) {
      this.props.loadQuestionBySlug(params.uid, params.slug);
    }

    this.props.loadQuestionCategories();
  }

  onSubmit = values => {
    const {
      match: { params }
    } = this.props;

    let formValues = values;

    formValues.uid = formValues.uid ? formValues.uid : createUid();
    formValues.slug = formValues.slug ? formValues.slug : createSlug(formValues.title);
    formValues.tags = values.tags ? values.tags.split(',') : [];

    if (params.uid && params.slug) {
      this.props.updateQuestion(formValues);
    } else {
      this.props.createQuestion(formValues);
    }
    setTimeout(() => {
      this.props.history.push(`/questions/${formValues.uid}/${formValues.slug}`);
    }, 150);
  };

  onCancel = () => {
    this.props.handleTabChange(1);
    this.props.reset('questionForm');
    this.props.history.goBack();
  };

  createPreviewData = () => {
    let i = 1;
    const previewTags = [];
    this.props.tagNames.map(tag => previewTags.push({ text: tag, _id: i++ }));
    return {
      ...this.props.questionData.values,
      user: this.props.currentUser,
      tags: this.props.tagNames
    };
  };

  render() {
    const { loading, activeQuestionTab, categories, handleTabChange, tagNames, handleUpdateTagNames } = this.props;
    if (loading) return <Loading />;
    return (
      <div className='flex-box sm'>
        <div className={`grow question-form tab-${activeQuestionTab}`}>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
            {activeQuestionTab === 1 && (
              <div>
                <div className='text-center mb-5'>
                  <h2 className='m-0'>What type of question do you have?</h2>
                  <p className='mt-2'>We’ll help you find the best way to get your answer.</p>
                </div>
                <div>
                  <h5>
                    <strong>1. </strong>Select a SPED category related to your question.
                  </h5>
                  <div className='columns'>
                    <Field
                      name='category'
                      options={{
                        key: '_id',
                        label: 'text',
                        data: categories
                      }}
                      component={RadioGroupInput}
                    />
                  </div>
                </div>
                <div className='my-3'>
                  <h5>
                    <strong>2. </strong>Add tags to help the right people find and answer your question.
                  </h5>
                  <Field
                    name='tags'
                    component={TagInput}
                    tags={tagNames}
                    updateTags={handleUpdateTagNames}
                    placeholder='e.g. (policy behavior kindergarten)'
                  />
                </div>
                <Button positive type='button' className='mt-3' onClick={() => handleTabChange(2)}>
                  Next&nbsp;&nbsp;
                  <Icon fitted name='right arrow' />
                </Button>
              </div>
            )}
            {activeQuestionTab === 2 && (
              <div>
                <div className='mb-1'>
                  <strong>Question:</strong>
                </div>
                <Field name='title' type='text' component={TextInput} placeholder='Question Title' />
                <div className='mt-3 mb-n2'>
                  <strong>Description:</strong>
                </div>
                <Field name='content' component={EditorInput} />
                <hr className='my-3' />
                <div className='flex-box between'>
                  <Button type='button' onClick={() => handleTabChange(1)}>
                    <Icon fitted name='left arrow' />
                    &nbsp;&nbsp;Question Type
                  </Button>
                  <Button type='button' positive onClick={() => handleTabChange(3)}>
                    Review Question&nbsp;&nbsp;
                    <Icon fitted name='right arrow' />
                  </Button>
                </div>
              </div>
            )}
            {activeQuestionTab === 3 && (
              <div>
                <div>
                  {this.props.questionData && this.props.questionData.values && (
                    <QuestionPreview question={this.props.questionData.values} user={this.props.currentUser} />
                  )}
                </div>
                <hr />
                <div className='flex-box between'>
                  <Button type='button' onClick={() => handleTabChange(1)}>
                    <Icon fitted name='left arrow' />
                    &nbsp;&nbsp;Edit Question
                  </Button>
                  <div>
                    <Button type='button' color='grey' className='mr-2' onClick={this.onCancel}>
                      <Icon fitted name='times' />
                      &nbsp;&nbsp;Cancel
                    </Button>
                    <Button type='submit' positive>
                      <Icon fitted name='check' />
                      &nbsp;&nbsp;Submit Question
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Form>
        </div>
        {activeQuestionTab === 2 && <QuestionHints />}
      </div>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'questionForm', validate })(withRouter(QuestionForm)));
