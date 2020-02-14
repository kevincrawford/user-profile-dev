import React, { Component } from 'react';
import { connect } from 'react-redux';

export class People extends Component {
  render() {
    return <div>people</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(People);
