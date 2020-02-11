import React, { Component } from 'react';
import { connect } from 'react-redux';

export class RegisterComponent extends Component {
  render() {
    return <div></div>;
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(RegisterComponent);
