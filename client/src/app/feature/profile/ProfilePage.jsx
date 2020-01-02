import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfilePage extends Component {
  render() {
    return <h1>profile</h1>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
