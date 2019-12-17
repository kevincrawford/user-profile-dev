import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './ModalActions';

const actions = { closeModal };

class NavModal extends Component {
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
        break;
    }
  };

  toggleNav = () => {
    this.props.toggleMobileNav();
    this.scrollToMenuRef();
  };
  render() {
    return (
      <Modal className='mobile-nav' open={true} onClose={this.props.closeModal}>
        <Modal.Content>
          <ul ref={this.menuRef} className='nav-mobile open'>
            <li>
              <span onClick={() => this.handleItemClick(this.props.closeModal)}>Eye On SPED</span>
            </li>
            <li>
              <span onClick={() => this.handleItemClick(this.props.closeModal)}>Resources</span>
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
              <span onClick={() => this.handleItemClick(navItems.questions)}>SPEDxchange</span>
            </li>
            <li>
              <span onClick={() => this.handleItemClick(navItems.categories)}>Categories</span>
            </li>
            <li>
              <span onClick={() => this.handleItemClick(navItems.tags)}>Tags</span>
            </li>
            <li>
              <span onClick={() => this.handleItemClick(navItems.people)}>People</span>
            </li>
            <li className='nav-spacer'></li>
            <li>
              <span onClick={() => this.handleItemClick(navItems.jobs)}>Jobs</span>
            </li>
          </ul>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(NavModal);
