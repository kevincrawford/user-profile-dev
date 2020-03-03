import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfileProgress extends Component {
  render() {
    return <div>Progress</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileProgress);
