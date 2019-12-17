import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Label } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { submitScholarshipApplication, fetchScholarshipApplication } from '../../common/ui/auth/AuthActions';
import { closeModal } from '../../common/ui/modal/ModalActions';
import TextInput from '../../common/ui/form/TextInput';
import EditorInput from '../../common/ui/form/EditorInput';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.elementName,
  auth: state.auth,
  initialValues: state.auth.scholarshipApplication
});

const actions = {
  submitScholarshipApplication,
  fetchScholarshipApplication,
  closeModal
};

const validate = combineValidators({
  school: isRequired({ message: 'University/School is required' }),
  graduation: isRequired({ message: 'Graduation Date is required' }),
  essay: isRequired({ message: 'Personal Statement is required' })
});

export class ScholarshipForm extends Component {
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.fetchScholarshipApplication();
    }
  }

  render() {
    const { loading, loadingName, closeModal, submitScholarshipApplication, handleSubmit, error } = this.props;

    return (
      <Form onSubmit={handleSubmit(submitScholarshipApplication)} autoComplete='off'>
        <label>University/School</label>
        <Field name='school' id='school' component={TextInput} type='text' />
        <label>Graduation Date</label>
        <Field name='graduation' id='graduation' placeholder='MM/YYYY' component={TextInput} type='text' />
        <label>
          <strong>How do I intend on impacting the lives of my future students? (Maximum 250 Words)</strong>
        </label>
        <Field name='essay' component={EditorInput} />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}
        <div className='flex-box pt-2'>
          <Button color='green' loading={loadingName === 'submit-scholarship' && loading} content='Submit' />
          <Button className='ml-3' type='button' loading={loadingName === 'submit-scholarship' && loading} content='Cancel' onClick={() => closeModal()} />
        </div>
      </Form>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'scholarshipForm', enableReinitialize: true, validate })(ScholarshipForm));
