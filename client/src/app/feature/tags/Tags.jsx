import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Tags extends Component {
  render() {
    return <div>tags</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
