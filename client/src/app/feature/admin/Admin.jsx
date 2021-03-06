import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { fetchOrg, fetchJobs } from './AdminActions';

import AdminOverview from './component/overview/AdminOverview';
import AdminJobList from './component/jobs/AdminJobList';
// import AdminLocationList from './component/locations/AdminLocationList';
// import AdminUserList from './component/users/AdminUserList';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.loadingName,
  auth: state.auth
});

const actions = {
  fetchOrg,
  fetchJobs
};

const panes = [
  {
    menuItem: 'Overview',
    render: () => (
      <Tab.Pane>
        <AdminOverview />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Jobs',
    render: () => (
      <Tab.Pane>
        <AdminJobList />
      </Tab.Pane>
    )
  } /*,
  {
    menuItem: 'Locations',
    render: () => (
      <Tab.Pane>
        <AdminLocationList />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Users',
    render: () => (
      <Tab.Pane>
        <AdminUserList />
      </Tab.Pane>
    )
  }*/
];

export class Admin extends Component {
  constructor(props) {
    super(props);

    // console.log('fetchOrg');
    this.props.fetchOrg();

    // console.log('fetchJobs');
    this.props.fetchJobs();

    if (this.props.match.params.id !== 'new') {
    }
  }
  render() {
    return (
      <div>
        <Tab menu={{ pointing: true }} panes={panes} />
      </div>
    );
  }
}

export default connect(mapState, actions)(withRouter(Admin));
