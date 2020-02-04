import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestOrganizationForm from './forms/TestOrganizationForm';
import OrganizationUserForm from './forms/OrganizationUserForm';
import OrganizationLocationForm from './forms/OrganizationLocationForm';

const mapState = state => ({});

const actions = {};

export class SiteForms extends Component {
  render() {
    return (
      <>
        <section>
          <h4>Organization</h4>
          <hr />
          <OrganizationForm />
          <hr />
        </section>
        <section>
          <h4>Organization User</h4>
          <hr />
          <OrganizationUserForm />
          <hr />
        </section>
        <section>
          <h4>Organization User</h4>
          <hr />
          <OrganizationLocationForm />
          <hr />
        </section>
      </>
    );
  }
}

export default connect(mapState, actions)(SiteForms);
