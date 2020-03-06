import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NAV_ITEMS } from '../../common/ui/nav/navConstants';
import { toggleSideBar, navItemClick } from '../../common/ui/nav/navActions';

class RouterStateHandler extends Component {
  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged = () => {
    // Scroll page to top
    window.scrollTo(0, 0);

    // Handle nav active item
    const url = this.props.location.pathname.split('/')[1];
    const path = `/${url}`;
    if (url !== '') {
      const activeLink = navLookup(url);
      this.props.navItemClick(activeLink);
    }
    const offPaths = ['/user', '/checkout', '/admin', '/dashboard', '/profile'];
    const toggleValue = offPaths.indexOf(path) > -1 ? false : true;
    this.props.toggleSideBar(toggleValue);
  };

  render() {
    return this.props.children;
  }
}

const navLookup = path => {
  const keys = Object.keys(NAV_ITEMS);
  if (keys.indexOf(path) > -1) {
    return NAV_ITEMS[path];
  }
  return { name: 'SPEDxchange', link: '/' };
};

const mapState = state => ({
  activeNavItem: state.nav.activeNavItem
});

const actions = { toggleSideBar, navItemClick };

export default connect(mapState, actions)(withRouter(RouterStateHandler));
