import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserForm extends Component {
  render() {
    return <div>user form</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
