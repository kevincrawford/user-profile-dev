import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ScrollTo, ScrollArea } from 'react-scroll-to';
import { toggleMobileNav, navItemClick } from '../navActions';
import { openModal } from '../../modal/ModalActions';
import { NAV_ITEMS } from '../navConstants';

const mapState = state => ({
  auth: state.auth,
  activeNavItem: state.nav.activeNavItem,
  isMobileNavOpen: state.nav.isMobileNavOpen
});

const actions = {
  toggleMobileNav,
  navItemClick,
  openModal
};

class NavMobile extends Component {
  toggleNav = () => {
    this.props.toggleMobileNav();
  };

  handleItemClick = item => {
    this.toggleNav();
    switch (item) {
      case 'login':
        this.props.openModal('LoginModal');
        break;

      case 'signup':
        this.props.openModal('RegisterModal');
        break;

      default:
        this.props.navItemClick(item);
        this.props.history.push(item.link);
        break;
    }
  };

  render() {
    const navItems = NAV_ITEMS;
    const { auth } = this.props;
    const authenticated = auth.authenticated && auth.currentUser.displayName;

    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <ScrollArea id='navMobile' className={this.props.isMobileNavOpen ? 'nav-mobile open' : 'nav-mobile'}>
            <ul>
              <li>
                <span onClick={() => this.handleItemClick(navItems.news)}>Eye On SPED</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.resources)}>Resources</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.scholarships)}>Scholarships</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.about)}>About Us</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.contact)}>Contact Us</span>
              </li>
              <li className='nav-spacer'></li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.questions)}>Questions</span>
              </li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.categories)}>Categories</span>
              </li>
              <li className='nav-spacer'></li>
              <li>
                <span onClick={() => this.handleItemClick(navItems.jobs)}>Jobs</span>
              </li>
              {!authenticated && (
                <>
                  <li className='nav-spacer'></li>
                  <li>
                    <span onClick={() => this.handleItemClick('login')}>Login</span>
                  </li>
                  <li>
                    <span onClick={() => this.handleItemClick('signup')}>Sign Up</span>
                  </li>
                </>
              )}
            </ul>
          </ScrollArea>
        )}
      </ScrollTo>
    );
  }
}

export default withRouter(connect(mapState, actions)(NavMobile));
