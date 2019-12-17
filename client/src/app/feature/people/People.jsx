import React from 'react';
import { connect } from 'react-redux';

const mapState = state => {
  return {};
};

const actions = {};

const People = () => {
  return <h1>People</h1>;
};

export default connect(
  mapState,
  actions
)(People);
