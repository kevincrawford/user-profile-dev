import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminUserList extends Component {
  render() {
    return <h1>User List</h1>;
  }
}

export default connect(mapState, actions)(AdminUserList);
