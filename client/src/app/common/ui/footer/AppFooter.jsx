import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Icon } from 'semantic-ui-react';
import { openModal } from '../modal/ModalActions';

const isUserAdmin = (role) => {
  return role.type === 'client-user';
};

export class AppFooter extends Component {
  openRegisterModal = () => {
    this.props.openModal('RegisterModal', { link: 'test' });
  };

  checkUser = (pathName) => {
    const { auth, history, openModal } = this.props;
    const isUser = auth.authenticated && auth.currentUser ? true : false;
    const isAdmin =
      auth.authenticated && auth.currentUser && auth.currentUser.roles.findIndex(isUserAdmin) > -1 ? true : false;

    if (pathName === '/profile') {
      if (isUser) {
        history.push(pathName);
        return;
      } else {
        openModal('RegisterModal');
        return;
      }
    }
    if (pathName === '/admin') {
      if (isAdmin) {
        history.push(pathName);
        return;
      } else {
        history.push('/postJob');
        return;
      }
    }
    openModal('RegisterModal');
    return;
  };

  render() {
    return (
      <div className='main-footer'>
        <Container>
          <div className='flex-box sm'>
            <div>
              <h6>SPEDxchange</h6>
              <div onClick={() => this.props.openModal('RegisterModal')}>
                <span className='link'>Sign Up</span>
              </div>
              <Link to='/about'>About Us</Link>
              <div onClick={() => this.props.openModal('ContactModal')}>
                <span className='link'>Contact Us</span>
              </div>
            </div>
            <div>
              <h6>Special Educators</h6>
              <Link to='/jobs'>Find a Job</Link>
              <Link to='/resources'>Resources</Link>
              <div onClick={() => this.checkUser('/profile')}>
                <span className='link'>Post a Resume</span>
              </div>
            </div>
            <div>
              <h6>SPED Employers</h6>
              <Link to='/resources'>Resources</Link>
              <div onClick={() => this.checkUser('/admin')}>
                <span className='link'>Post a Job</span>
              </div>
            </div>
            <div className='social'>
              <h6>Connect</h6>
              <a href='https://twitter.com/theSPEDxchange' target='_blank' rel='noopener noreferrer'>
                <Icon fitted name='twitter' />
                &nbsp; Twitter
              </a>
              <a href='https://www.facebook.com/SPEDxchange' target='_blank' rel='noopener noreferrer'>
                <Icon fitted name='facebook' />
                &nbsp; Facebook
              </a>
              <a href='https://www.linkedin.com/in/johnconsalvi/' target='_blank' rel='noopener noreferrer'>
                <Icon fitted name='linkedin' />
                &nbsp; LinkdIn
              </a>
              <a href='https://www.instagram.com/spedxchange/' target='_blank' rel='noopener noreferrer'>
                <Icon fitted name='instagram' />
                &nbsp; Instagram
              </a>
              <a
                href='https://www.youtube.com/channel/UChimMb9m3ASj5X6wxMSTSAA'
                target='_blank'
                rel='noopener noreferrer'>
                <Icon fitted name='youtube' />
                &nbsp; YouTube
              </a>
            </div>
            <div className='col-md mb-3'>
              <h6>Legal</h6>
              <a
                href='https://app.termly.io/document/privacy-policy/9e6f1ec2-6b4e-4bce-944c-dc3fa68768c5'
                target='_blank'
                rel='noopener noreferrer'>
                Privacy Policy
              </a>
              <a
                href='https://app.termly.io/document/terms-of-use-for-website/c2c6e3f1-ffcf-4ff2-ad92-f67aba4f6f53'
                target='_blank'
                rel='noopener noreferrer'>
                Terms of Use
              </a>
            </div>
          </div>
          <div className='flex-box sm legal'>
            <div className='grow'>
              <strong>SPEDxchange</strong> | 1740 Ridge Ave, Suite 500 | Evanston Il, 60201 |{' '}
              <a href='tel:1-224-300-7733'>224.300.7733</a>
            </div>
            <div>&copy; Copyright 2019 SPEDxchange</div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
});

const actions = {
  openModal,
};

export default connect(mapState, actions)(withRouter(AppFooter));
