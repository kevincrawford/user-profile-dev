import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button } from 'semantic-ui-react';
import { geocodeByAddress } from 'react-places-autocomplete';
import { fetchBackfillJobs } from './actions/jobsActions';
import TextInput from '../../common/ui/form/TextInput';
import PlaceInput from '../../common/ui/form/PlaceInput';

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

export class JobsForm extends Component {
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
    return (
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
    );
  }
}

export default connect(null, actions)(reduxForm({ form: 'jobSearchForm', validate })(withRouter(JobsForm)));
