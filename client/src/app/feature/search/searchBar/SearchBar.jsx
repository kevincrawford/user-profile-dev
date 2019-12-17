import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { doSearch } from '../searchActions';
import { toggleSearchBar } from '../../../common/ui/nav/navActions';
import { connect } from 'react-redux';

const mapState = state => ({
  query: state.search.query,
  results: state.search.results,
  isSearchBarOpen: state.nav.isSearchBarOpen
});

const actions = {
  doSearch,
  toggleSearchBar
};

const SearchInput = ({ input }) => {
  return (
    <Form.Field>
      <Input {...input} size='small' action='Search' icon='search' iconPosition='left' placeholder='Search...' />
    </Form.Field>
  );
};

const SearchBar = ({ doSearch, handleSubmit, isSearchBarOpen, error }) => {
  return (
    <Form className={isSearchBarOpen ? 'flex-box search-form open' : 'flex-box search-form'} onSubmit={handleSubmit(doSearch)} autoComplete='off'>
      <Field name='query' component={SearchInput} type='text' />
    </Form>
  );
};

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'searchForm' })(SearchBar));
