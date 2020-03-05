import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openModal } from '../../../common/ui/modal/ModalActions';

export class ProfileAbout extends Component {
  render() {
    const { firstName, lastName, title, summary } = this.props.user;
    return (
      <section>
        <div className='d-flex w-100'>
          <h6 className='flex-grow-1 d-block m-0'>
            <b>About Me</b>
          </h6>
          <span className='link' onClick={() => this.props.openModal('ProfileAboutModal')}>
            Edit
          </span>
        </div>
        <div className='section-content'>
          <div className='avatar_wrap'>
            <i>
              <div className='avatar'>
                <span className='photo'>
                  <img alt='My Avatar' src='/assets/img/user.png' />
                </span>
              </div>
            </i>
          </div>
          <div className='text-center' onClick={() => this.props.openModal('ProfileAboutModal')}>
            <div>
              <strong>
                {firstName} {lastName}
              </strong>
            </div>
            <div className='mb-3'>{title && title.length > 0 ? title : <span className='link'>Add Title</span>}</div>
            <div className='mb-2'>
              {summary && summary.length > 0 ? <em>{summary}</em> : <span className='link'>Add Summary</span>}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

const mapDispatchToProps = {
  openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout);
