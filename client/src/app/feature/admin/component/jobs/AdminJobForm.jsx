import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Dropdown, Button } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';
import { createJob, fetchJob, updateJob, saveJob } from '../../AdminActions';
import { asyncActionStart } from '../../../../common/actions/async/asyncActions';
import Loading from '../../../../common/ui/loading/Loading';

export class AdminJobForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.id !== 'new') {
      console.log('fetchJob');
      this.props.fetchJob(this.props.match.params.id, this.props.history);
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onSalaryRangeSelect = this.onSalaryRangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('handleChange');
    this.props.updateJob(e.target.name, e.target.value);
  }

  handleSelectChange(e, data) {
    this.props.updateJob(data.name, data.value);
  }

  handleEditorChange = (content, editor) => {
    this.props.updateJob('description', content);
  };

  onSalaryRangeSelect(e) {
    this.props.updateJob('salaryPeriod', e.target.textContent);
  }

  handleSubmit(event) {
    // console.log('handleSubmit: state: ', this.state);
    // console.log('handleSubmit: props: ', this.props);
    if (this.props.match.params.id !== 'new') {
      this.props.saveJob(this.props.job);
    } else {
      this.props.createJob(this.props.job, this.props.history);
    }
    event.preventDefault();
  }

  render() {
    const { jobId, jobType, title, summary, description, status, salaryAmount } = this.props.job;
    if (this.props.loading && this.props.loadingName === 'fetch-job') return <Loading />;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className='job-edit flex-box sm'>
          <div className='grow'>
            <div className='flex-box between sm mb-3'>
              <div className='half'>
                <label>Job ID</label>
                <Form.Input name='jobId' value={jobId} onChange={this.handleChange} />
              </div>
              <div className='half'>
                <label>Job Type</label>
                <Form.Select
                  fluid
                  name='jobType'
                  value={jobType}
                  onChange={this.handleSelectChange}
                  options={jobTypeOptions}
                />
              </div>
            </div>
            <div className='flex-box between sm mb-3'>
              <div className='half'>
                <label>Title</label>
                <Form.Input name='title' value={title} onChange={this.handleChange} />
              </div>
              <div className='half'>
                <label>Salary</label>
                <Input
                  fluid
                  label={
                    <Dropdown defaultValue='Year' options={salaryPeriodOptions} onChange={this.onSalaryRangeSelect} />
                  }
                  icon='dollar sign'
                  iconPosition='left'
                  labelPosition='right'
                  name='salaryAmount'
                  value={salaryAmount}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Summary</label>
              <Form.Input name='summary' value={summary} onChange={this.handleChange} />
            </div>
            <div className='mt-3'>
              <label>Description</label>
              <Editor
                initialValue={`<p>${description}</p>`}
                apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
                onEditorChange={this.handleEditorChange}
                init={{
                  height: 250,
                  menubar: false,
                  elementpath: false,
                  plugins: ['lists link searchreplace fullscreen paste'],
                  toolbar: 'fullscreen | bold italic underline strikethrough | bullist numlist | link ',
                  default_link_target: '_blank',
                  link_assume_external_targets: true,
                  link_title: false,
                  target_list: false
                }}
              />
            </div>
          </div>
          <div className='spacer'></div>
          <div className='publish-panel'>
            <label>&nbsp;</label>
            <div className='flex-box between mb-3'>
              <div className='half'>
                <Button fluid color='blue' content='preview' onClick={this.handleSubmit} />
              </div>
              <div className='half'>
                <Button fluid color='green' content='save' onClick={this.handleSubmit} />
              </div>
            </div>
            {status === 'Draft' ? (
              <Button fluid color='green' content='Publish' />
            ) : (
              <Button fluid color='grey' content='Unpublish' />
            )}
          </div>
        </div>
      </Form>
    );
  }
}

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

const mapStateToProps = state => ({
  loading: state.async.loading,
  loadingName: state.async.loadingName,
  auth: state.auth,
  org: state.admin.org,
  job: state.admin.job
});

const mapDispatchToProps = {
  asyncActionStart,
  fetchJob,
  createJob,
  updateJob,
  saveJob
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobForm);
