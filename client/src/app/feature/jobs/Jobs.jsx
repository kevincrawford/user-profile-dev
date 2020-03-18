import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchBackfillJobs } from './actions/jobsActions';
import { geocodeByAddress } from 'react-places-autocomplete';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
// import JobsForm from './JobsForm';
import JobsListItem from './JobsListItem';
import JobsListLocalItem from './JobsListLocalItem';
import TextInput from '../../common/ui/form/TextInput';
import PlaceInput from '../../common/ui/form/PlaceInput';

import indeed from '../../../assets/indeed.gif';

const mapState = state => ({
  backfillJobs: state.jobs.backfillJobs,
  localJobs: state.jobs.localJobs
});

const actions = {
  fetchBackfillJobs
};

const validate = combineValidators({
  l: isRequired({
    message: 'City, State or Zip is required'
  }),
  q: isRequired({
    message: 'Job Title or Keywords are required'
  })
});

export class Jobs extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
  }

  onSubmit(values) {
    console.log('values: ', values);
    const { q, l } = values;
    if (!q || !l) {
      return;
    }
    const params = {
      l: l.trim(),
      q: q.trim()
    };
    this.props.fetchBackfillJobs(params);
  }

  handleCitySelect(selectedCity) {
    geocodeByAddress(selectedCity).then(() => {
      this.props.change('l', selectedCity);
    });
  }

  render() {
    const { backfillJobs, localJobs } = this.props;
    return (
      <>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete='off'>
          <div className='flex-box start sm jobs-search-form'>
            <div className='term'>
              <Field name='q' type='text' component={TextInput} placeholder='Job Title or Keywords' />
            </div>
            <div className='location'>
              <Field
                type='text'
                name='l'
                component={PlaceInput}
                options={{ types: ['(cities)'], componentRestrictions: { country: 'us' } }}
                onSelect={this.handleCitySelect}
                placeholder='City, State or Zip'
              />
            </div>
            <div className='submit'>
              <Button type='submit' color='green'>
                Find Jobs!
              </Button>
            </div>
          </div>
        </Form>
        {localJobs && localJobs.length > 0 && (
          <>
            <h3 className='mb-1'>Featured Jobs</h3>
            <div className='job-list mb-5'>
              {localJobs.map((job, idx) => (
                <JobsListLocalItem key={idx.toString()} job={job} />
              ))}
            </div>
          </>
        )}
        {localJobs && localJobs.length > 0 && backfillJobs && backfillJobs.length > 0 && (
          <span>
            <span>jobs by</span>{' '}
            <a
              href='https://www.indeed.com/'
              target='_blank'
              rel='noopener noreferrer'
              title='Job Search'
              className='align-top'>
              <img className='indeed-logo' src={indeed} alt='Indeed job search' />
            </a>
          </span>
        )}
        <div className='job-list'>
          {backfillJobs &&
            backfillJobs.length > 0 &&
            backfillJobs.map((job, idx) => <JobsListItem key={idx.toString()} job={job} />)}
        </div>
      </>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: 'jobSearchForm', validate })(Jobs));
