import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export class AdminJobList extends Component {
  render() {
    return <div>jobs list</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobList);
