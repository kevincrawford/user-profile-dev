import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Dashboard extends Component {
  render() {
    return <h1>Dashboard Page</h1>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);