import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Dashboard extends Component {
  render() {
    return <h1>Dashboard Page</h1>;
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(Dashboard);
