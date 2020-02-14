import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toggleMobileNav, toggleSearchBar, navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { signOut } from '../../auth/AuthActions';

import GuestMenu from './menus/GuestMenu';
import AuthMenu from './menus/AuthMenu';
import logo from './spedxchange-brand.svg';

class NavBar extends Component {
  handleLogin = () => {
    this.props.openModal('LoginModal');
  };

  handlePostJob = () => {
    // this.props.openModal('RegisterModal');
    this.props.history.push('/postjob');
  };

  handleSignUp = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.signOut();
  };

  handleMenuNavigation = path => {
    this.props.history.push(path);
  };

  toggleNav = () => {
    this.props.toggleMobileNav();
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser.displayName;
    return (
      <div className='app-header'>
        <div className='flex-box'>
          <Link className='brand' to='/'>
            <img src={logo} alt='SPEDxchange' />
          </Link>
          <div className='flex-box grow nav-content'>
            {authenticated ? (
              <AuthMenu profile={auth.currentUser} onNav={this.handleMenuNavigation} signOut={this.handleSignOut} />
            ) : (
              <GuestMenu postJob={this.handlePostJob} login={this.handleLogin} register={this.handleSignUp} />
            )}
            <button className='square' onClick={this.props.toggleSearchBar}>
              <Icon name='search' />
            </button>
            <button className='square mobile' onClick={this.toggleNav}>
              <Icon name='bars' />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  auth: state.auth,
  activeNavItem: state.nav.activeNavItem,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

const actions = {
  toggleSearchBar,
  toggleMobileNav,
  navItemClick,
  openModal,
  signOut
};

export default withRouter(connect(mapState, actions)(NavBar));
