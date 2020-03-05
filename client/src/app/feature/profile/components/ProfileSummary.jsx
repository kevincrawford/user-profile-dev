import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ProfileSummary extends Component {
  render() {
    return (
      <section>
        <div className='d-flex w-100'>
          <h6 className='flex-grow-1 d-block m-0'>
            <b>About Me</b>
          </h6>
          <i>Edit</i>
        </div>
        <div className='section-content'>
          <div className='avatar_wrap'>
            <i>
              <div className='avatar'>
                <span className='photo'>
                  <img alt='My Avatar' src='/assets/img/user.png' />
                </span>
                <i className='badge add'>Add Photo</i>
              </div>
            </i>
          </div>
          <div className='text-center'>
            <div>
              <strong>Kevin Crawford</strong>
            </div>
            <div>Add My Headline</div>
            <div>Add My Location</div>
            <div>Add My Phone</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSummary);
