import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Dropdown, Button, Breadcrumb } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';
import { createJob, fetchJob, updateJobProp, saveJob, clearJob } from '../../AdminActions';
import { asyncActionStart } from '../../../../common/actions/async/asyncActions';
import Loading from '../../../../common/ui/loading/Loading';
import AdminJobPreview from './AdminJobPreview';
// import AdminJobSummaryPreview from './AdminJobSummaryPreview';

export class AdminJobForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: false,
      userOptions: [],
      locationOptions: []
    };

    this.handleTogglePreview = this.handleTogglePreview.bind(this);
    this.handleNewJob = this.handleNewJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onSalaryRangeSelect = this.onSalaryRangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      this.props.fetchJob(this.props.match.params.id, this.props.history);
    }

    setTimeout(() => {
      if (this.props.org && this.props.org.users && this.props.org.users.length > 0) {
        let userOptions = [];
        for (let user of this.props.org.users) {
          userOptions.push({ key: user._id, text: `${user.firstName} ${user.lastName}`, value: user._id });
        }
        // console.log('userOptions:', userOptions);

        let locationOptions = [];
        for (let location of this.props.org.locations) {
          locationOptions.push({ key: location._id, text: location.name, value: location._id });
        }
        // console.log('locationOptions:', locationOptions);
        this.setState({
          ...this.state,
          userOptions: userOptions,
          locationOptions: locationOptions
        });
      }
    }, 150);
  }

  handleTogglePreview() {
    this.setState({
      ...this.state,
      preview: !this.state.preview
    });
  }

  handleNewJob(id) {
    this.props.clearJob();
    this.props.history.push(`/admin/job/new`);
  }

  handleChange(e) {
    // console.log('handleChange');
    this.props.updateJobProp(e.target.name, e.target.value);
  }

  handleSelectChange(e, data) {
    this.props.updateJobProp(data.name, data.value);
  }

  handleEditorChange(content, editor) {
    this.props.updateJobProp('description', content);
  }

  onSalaryRangeSelect(e) {
    this.props.updateJobProp('salaryPeriod', e.target.textContent);
  }

  handleSubmit(event, publish) {
    if (publish === 'publish') this.props.updateJobProp('status', 'Published');
    if (publish === 'unpublish') this.props.updateJobProp('status', 'Draft');

    setTimeout(() => {
      if (this.props.match.params.id !== 'new') {
        this.props.saveJob(this.props.job);
      } else {
        this.props.createJob(this.props.job, this.props.history);
      }
    }, 100);

    event.preventDefault();
  }

  render() {
    const {
      jobAdmin,
      jobId,
      jobType,
      title,
      summary,
      description,
      status,
      salaryAmount,
      applyLink,
      location
    } = this.props.job;
    if (this.props.loading && this.props.loadingName === 'fetch-job') return <Loading />;
    return (
      <>
        <div className='admin-nav'>
          <div className='flex-box between'>
            <div className='flex-box align-center grow'>
              <Breadcrumb size='large'>
                <Breadcrumb.Section link onClick={() => this.props.history.push('/admin')}>
                  Job List
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Edit Job</Breadcrumb.Section>
              </Breadcrumb>
            </div>
            <Button content='New Job' primary onClick={this.handleNewJob} />
          </div>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <div className='job-edit flex-box sm'>
            {this.state.preview ? (
              <div className='grow pr-4'>
                <AdminJobPreview />
              </div>
            ) : (
              <div className='grow pr-4'>
                <div className='mb-4'>
                  <label>Title</label>
                  <Form.Input name='title' value={title} onChange={this.handleChange} />
                </div>

                <div className='mt-4'>
                  <label>Summary</label>
                  <Form.Input name='summary' value={summary} onChange={this.handleChange} />
                </div>
                <div className='mt-4'>
                  <label>Description</label>
                  <Editor
                    initialValue={description && description.length > 0 ? description : `<p></p>`}
                    value={description}
                    apiKey='twpt6v84p920kri6p37w1wk4258x70z5e2yjhikzlu6mysb6'
                    onEditorChange={this.handleEditorChange}
                    init={{
                      height: 400,
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
            )}
            <div className='spacer'></div>
            <div className='publish-panel'>
              <label>&nbsp;</label>
              <div className='flex-box between mb-4'>
                <div className='half'>
                  <Button
                    fluid
                    color='grey'
                    type='button'
                    content={this.state.preview ? 'Edit' : 'Preview'}
                    onClick={this.handleTogglePreview}
                  />
                </div>
                <div className='half'>
                  <Button fluid color='blue' content='Save' onClick={this.handleSubmit} />
                </div>
              </div>
              <div className='mb-4'>
                {status === 'Draft' ? (
                  <Button fluid color='green' content='Publish' onClick={e => this.handleSubmit(e, 'publish')} />
                ) : (
                  <Button fluid color='grey' content='Unpublish' onClick={e => this.handleSubmit(e, 'unpublish')} />
                )}
              </div>

              <div className='mb-4'>
                <label>Job ID</label>
                <Form.Input name='jobId' value={jobId} onChange={this.handleChange} />
              </div>

              {this.state.userOptions && this.state.userOptions.length > 1 && (
                <div className='mb-4'>
                  <label>Job Administrator</label>
                  <Form.Select
                    fluid
                    name='jobAdmin'
                    value={jobAdmin}
                    onChange={this.handleSelectChange}
                    options={this.state.userOptions}
                  />
                </div>
              )}

              {this.state.locationOptions && this.state.locationOptions.length > 1 && (
                <div className='mb-4'>
                  <label>Location</label>
                  <Form.Select
                    fluid
                    name='location'
                    value={location}
                    onChange={this.handleSelectChange}
                    options={this.state.locationOptions}
                  />
                </div>
              )}

              <div className='mb-4'>
                <label>Application Link</label>
                <Form.Input name='applyLink' value={applyLink} onChange={this.handleChange} />
              </div>

              <div className='mb-4'>
                <label>Job Type</label>
                <Form.Select
                  fluid
                  name='jobType'
                  value={jobType}
                  onChange={this.handleSelectChange}
                  options={jobTypeOptions}
                />
              </div>

              <div className='mb-4'>
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
          </div>
        </Form>
      </>
    );
  }
}

const jobTypeOptions = [
  { key: 'Full-time', text: 'Full-time', value: 'Full-time' },
  { key: 'Part-time', text: 'Part-time', value: 'Part-time' },
  { key: 'Substitute', text: 'Substitute', value: 'Substitute' },
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
  updateJobProp,
  saveJob,
  clearJob
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminJobForm));
