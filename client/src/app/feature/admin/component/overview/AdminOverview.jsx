import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminOverview extends Component {
  render() {
    return <div>Admin Overview</div>;
  }
}

export default connect(mapState, actions)(AdminOverview);
