import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../common/ui/loading/Loading';

export class Dashboard extends Component {
  render() {
    const { loading } = this.props;
    if (loading) return <Loading />;
    return <h1>Dashboard Page</h1>;
  }
}

const mapState = state => ({
  loading: state.auth.loading
});

const actions = {};

export default connect(mapState, actions)(Dashboard);
