import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapState = state => ({});

const actions = {};

export class AdminJobPreview extends Component {
  render() {
    return <div>Job Preview</div>;
  }
}

export default connect(mapState, actions)(AdminJobPreview);