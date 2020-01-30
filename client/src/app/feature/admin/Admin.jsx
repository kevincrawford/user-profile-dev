import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';

import AdminOverview from './component/overview/AdminOverview';
import AdminJobList from './component/jobs/AdminJobList';
import AdminLocationList from './component/locations/AdminLocationList';
import AdminUserList from './component/users/AdminUserList';

import './Admin.scss';

const mapState = state => ({});

const actions = {};

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
  },
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
  }
];

export class Admin extends Component {
  render() {
    return (
      <div>
        <Tab menu={{ fluid: true, pointing: true, vertical: true }} panes={panes} />
      </div>
    );
  }
}

export default connect(mapState, actions)(Admin);
