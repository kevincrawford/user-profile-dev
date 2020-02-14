import React, { Component } from 'react';
import { connect } from 'react-redux';

export class LoginPage extends Component {
  render() {
    return <div>Login Page</div>;
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(LoginPage);
