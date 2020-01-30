import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminJobList extends Component {
  render() {
    return <div>Jobs List</div>;
  }
}

export default connect(mapState, actions)(AdminJobList);
