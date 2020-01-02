import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { openModal } from '../../modal/ModalActions';
import { toggleSideBar } from '../navActions';

const mapState = state => ({
  isSideBarOpen: state.nav.isSideBarOpen
});

const actions = {
  openModal,
  toggleSideBar
};

class SideBar extends Component {
  state = {
    activeItem: '/' + this.props.match.url.split('/')[1],
    visible: true
  };

  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathName !== prevProps.location.pathName) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const pathRoot = '/' + this.props.match.url.split('/')[1];
    const offPaths = ['/user', '/checkout'];
    if (offPaths.indexOf(pathRoot) > -1) {
      // console.log('should hide sidebar');
      if (this.props.isSideBarOpen) {
        // console.log('did hide sidebar');
        this.props.toggleSideBar(false);
      }

      this.setState({ visible: false });
    } else {
      // console.log('should show sidebar');
      if (!this.props.isSideBarOpen) {
        // console.log('did show sidebar');
        this.props.toggleSideBar(true);
      }

      this.setState({ visible: true });
    }
    this.setState({ activeItem: pathRoot });
  }

  handleItemClick = (e, { path }) => {
    this.setState({ activeItem: path });
    this.props.history.push(path);
  };

  openContactModal = () => {
    this.props.openModal('ContactModal');
  };

  render() {
    const { activeItem, visible } = this.state;

    return (
      <Menu text vertical className={visible ? 'app-sidebar' : 'app-sidebar hidden'}>
        <Menu.Item link name='Eye On SPED' path='/news' active={activeItem === '/news'} onClick={this.handleItemClick} />
        <Menu.Item link name='Resources' path='/resources' active={activeItem === '/resources'} onClick={this.handleItemClick} />
        <Menu.Item link name='Scholarships' path='/scholarships' active={activeItem === '/scholarships'} onClick={this.handleItemClick} />
        <Menu.Item link name='About Us' path='/about' active={activeItem === '/about'} onClick={this.handleItemClick} />
        <Menu.Item link name='Contact Us' path='/contact' active={activeItem === '/contact'} onClick={this.openContactModal} />
        <hr />
        <Menu.Item link name='Questions' path='/questions' active={activeItem === '/questions'} onClick={this.handleItemClick} />
        <Menu.Item link name='Categories' path='/categories' active={activeItem === '/categories'} onClick={this.handleItemClick} />
        <hr />
        <Menu.Item link name='Jobs' path='/jobs' active={activeItem === '/jobs'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default withRouter(connect(mapState, actions)(SideBar));
