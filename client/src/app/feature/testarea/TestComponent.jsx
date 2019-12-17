import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync, itemClick } from './TestActions';
import { Button, Icon } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import logo from '../../common/ui/nav/navBar/spedxchange-brand.svg';
import './test.scss';

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
  activeItem: state.test.activeItem
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
  itemClick
};

class TestComponent extends Component {
  state = {
    latlng: {
      lat: 41.84,
      lng: -87.82
    }
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latlng: latLng
        });
      })
      .catch(error => console.error('Error', error));
  };

  handleItemClick = item => {
    this.props.itemClick(item);
  };

  render() {
    const { data, incrementAsync, decrementAsync, openModal, loading, buttonName } = this.props;

    return (
      <div>
        <h1 className='brand'>Test Component</h1>
        <hr />

        <hr />

        <div className='test-header'>
          <div className='flex-box'>
            <Link className='brand' to='/'>
              <img src={logo} alt='SPEDxchange' />
            </Link>
            <div className='flex-box grow nav-content'>
              <button className='search'>
                <Icon name='search' />
              </button>
              <button>Login</button>
              <button>Sign Up</button>
            </div>
          </div>
        </div>

        <hr />

        <h3>answer {data}</h3>
        <Button name='increment' loading={buttonName === 'increment' && loading} onClick={e => incrementAsync(e.target.name)} positive content='add' />
        <Button name='decrement' loading={buttonName === 'decrement' && loading} onClick={e => decrementAsync(e.target.name)} negative content='sub' />
        <Button onClick={() => openModal('TestModal', { data: 42 })} color='teal' content='Open Modal' />
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
        <hr />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
