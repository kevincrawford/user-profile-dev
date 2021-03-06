import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const AuthMenu = ({ signOut, onNav, profile }) => {
  const name = capitalize(profile.firstName);
  return (
    <Menu.Item className='user-menu'>
      <Image avatar spaced='right' src={profile.photoURL || '/assets/img/user.png'} />
      <Dropdown pointing='top right' text={name}>
        <Dropdown.Menu>
          <Dropdown.Item text='Jobs' icon='dashboard' onClick={() => onNav('/admin')} />
          <Dropdown.Item text='Profile' icon='user' onClick={() => onNav('/profile')} />
          <Dropdown.Divider />
          <Dropdown.Item text='Ask Question' icon='plus' onClick={() => onNav('/ask')} />
          <Dropdown.Divider />
          <Dropdown.Item text='Sign Out' icon='power' onClick={signOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default AuthMenu;

/*
          <Dropdown.Item text='My Profile' icon='user' onClick={() => onNav('/user')} />
*/
