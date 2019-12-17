import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import { search } from './searchActions';
import { connect } from 'react-redux';

const actions = {
  search
};

const SearchForm = ({ search, handleSubmit }) => {
  return (
    <Form className='search-bar' onSubmit={handleSubmit(search)} autoComplete='off'>
      <Input action='Search' icon='search' iconPosition='left' placeholder='Search...' />
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'searchForm' })(SearchForm));
