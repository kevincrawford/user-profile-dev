import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminUserForm extends Component {
  render() {
    return <div>Admin Edit</div>;
  }
}

export default connect(mapState, actions)(AdminUserForm);
