import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

const AuthMenu = ({ signOut, onNav, profile }) => {
  return (
    <Menu.Item className='user-menu'>
      <Image avatar spaced='right' src={profile.photoURL || '/assets/img/user.png'} />
      <Dropdown pointing='top right' text={profile.displayName}>
        <Dropdown.Menu>
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
