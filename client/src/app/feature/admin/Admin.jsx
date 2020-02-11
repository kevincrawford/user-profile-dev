import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';

import AdminOverview from './component/overview/AdminOverview';
import AdminJobList from './component/jobs/AdminJobList';
import AdminLocationList from './component/locations/AdminLocationList';
import AdminUserList from './component/users/AdminUserList';
import AdminSetup from './component/setup/AdminSetup';

import './Admin.scss';

const mapState = state => ({
  loading: state.async.loading,
  loadingName: state.async.loadingName,
  auth: state.auth
});

const actions = {
  openModal
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
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser.organization;
    if (!authenticated) return <AdminSetup />;
    return (
      <div>
        <Tab menu={{ pointing: true }} panes={panes} />
      </div>
    );
  }
}

export default connect(mapState, actions)(Admin);
