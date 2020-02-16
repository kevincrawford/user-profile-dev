import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminOverview extends Component {
  render() {
    return (
      <>
        <div>Admin Overview</div>
        <a href='/admin/job/new'>new job</a>
      </>
    );
  }
}

export default connect(mapState, actions)(AdminOverview);
