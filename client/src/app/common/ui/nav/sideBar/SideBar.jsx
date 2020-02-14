import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { openModal } from '../../modal/ModalActions';
import { toggleSideBar } from '../navActions';
import { NAV_ITEMS } from '../navConstants';

const mapState = state => ({
  activeNavItem: state.nav.activeNavItem,
  isSideBarOpen: state.nav.isSideBarOpen
});

const actions = {
  openModal,
  toggleSideBar
};

class SideBar extends Component {
  handleItemClick = (e, { item }) => {
    this.props.history.push(item.link);
  };

  openContactModal = () => {
    this.props.openModal('ContactModal');
  };

  render() {
    const { isSideBarOpen, activeNavItem } = this.props;
    return (
      <Menu text vertical className={isSideBarOpen ? 'app-sidebar' : 'app-sidebar hidden'}>
        <Menu.Item link name='Eye On SPED' item={NAV_ITEMS.news} active={activeNavItem.link === '/news'} onClick={this.handleItemClick} />
        <Menu.Item link name='Resources' item={NAV_ITEMS.resources} active={activeNavItem.link === '/resources'} onClick={this.handleItemClick} />
        <Menu.Item link name='Scholarships' item={NAV_ITEMS.scholarships} active={activeNavItem.link === '/scholarships'} onClick={this.handleItemClick} />
        <Menu.Item link name='About Us' item={NAV_ITEMS.about} active={activeNavItem.link === '/about'} onClick={this.handleItemClick} />
        <Menu.Item link name='Contact Us' item={NAV_ITEMS.contact} active={activeNavItem.link === '/contact'} onClick={this.openContactModal} />
        <hr />
        <Menu.Item link name='Questions' item={NAV_ITEMS.questions} active={activeNavItem.link === '/questions'} onClick={this.handleItemClick} />
        <Menu.Item link name='Categories' item={NAV_ITEMS.categories} active={activeNavItem.link === '/categories'} onClick={this.handleItemClick} />
        <hr />
        <Menu.Item link name='Jobs' item={NAV_ITEMS.jobs} active={activeNavItem.link === '/jobs'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default withRouter(connect(mapState, actions)(SideBar));
