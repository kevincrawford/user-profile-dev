import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfilePage extends Component {
  render() {
    return (
      <div className='flex-box md'>
        <div className='grow'>
          <div>about me</div>
          <div>progress</div>
          <div>social</div>
        </div>
        <div className='spacer'></div>
        <div className='grow'>
          <div>summary</div>
          <div>experience</div>
          <div>education</div>
          <div>certifications</div>
        </div>
        <div className='spacer'></div>
        <div className='grow'>
          <div>visible</div>
          <div>relocate</div>
          <div>resumes</div>
          <div>other</div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const actions = {};

export default connect(mapState, actions)(ProfilePage);
