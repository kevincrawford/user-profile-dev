import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileAbout from './components/ProfileAbout';
import ProfileProgress from './components/ProfileProgress';
import ProfileSocial from './components/ProfileSocial';
import ProfileSummary from './components/ProfileSummary';
import ProfileExperience from './components/ProfileExperience';
import ProfileEducation from './components/ProfileEducation';
import ProfileCertification from './components/ProfileCertification';
import ProfileVisible from './components/ProfileVisible';
import ProfileRelocate from './components/ProfileRelocate';
import ProfileResume from './components/ProfileResume';
import ProfileOther from './components/ProfileOther';

import './profile.scss';

export class ProfilePage extends Component {
  render() {
    return (
      <div className='profile-wrap flex-box md'>
        <div className='grow'>
          <ProfileAbout />
          <ProfileProgress />
          <ProfileSocial />
        </div>
        <div className='spacer'></div>
        <div className='grow'>
          <ProfileSummary />
          <ProfileExperience />
          <ProfileEducation />
          <ProfileCertification />
        </div>
        <div className='spacer'></div>
        <div className='grow'>
          <ProfileVisible />
          <ProfileRelocate />
          <ProfileResume />
          <ProfileOther />
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(ProfilePage);
