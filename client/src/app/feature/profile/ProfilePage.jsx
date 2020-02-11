import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfilePage extends Component {
  render() {
    return <h1>profile</h1>;
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(ProfilePage);
