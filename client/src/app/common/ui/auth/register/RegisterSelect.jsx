import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class RegisterSelect extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div>
        <h3>Tell Us About Yourself</h3>
        <div>I'm a Special Educator</div>
        <div>I'm a Special Education Employer</div>
      </div>
    );
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(RegisterSelect);
