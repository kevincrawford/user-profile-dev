import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfileOther extends Component {
  render() {
    return <div>Other</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOther);
