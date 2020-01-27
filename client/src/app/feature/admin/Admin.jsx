import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class Admin extends Component {
  render() {
    return <div>admin</div>;
  }
}

export default connect(mapState, actions)(Admin);
