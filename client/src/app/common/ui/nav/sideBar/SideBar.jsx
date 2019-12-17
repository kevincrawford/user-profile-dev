import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { openModal } from '../../modal/ModalActions';

const actions = {
  openModal
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
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const pathRoot = '/' + this.props.match.url.split('/')[1];
    console.log('sideBar: onRouteChanged: pathRoot: ', pathRoot);
    if (pathRoot === '/user') {
      this.setState({ visible: false });
    } else {
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

export default withRouter(connect(null, actions)(SideBar));
