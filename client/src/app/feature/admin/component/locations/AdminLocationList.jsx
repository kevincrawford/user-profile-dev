import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminLocationList extends Component {
  render() {
    return <div>Location List</div>;
  }
}

export default connect(mapState, actions)(AdminLocationList);
