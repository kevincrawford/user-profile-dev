import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ScholarshipReview extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  applications: state.dashboard.applications
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScholarshipReview);
