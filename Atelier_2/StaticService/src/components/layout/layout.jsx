import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Layout = ({ children }) => {
  return (
    <>
      <Menu inverted>
        <Menu.Item>
          <Link to="/menu">Menu</Link>
        </Menu.Item>
        <Menu.Item style={{ marginLeft: 'auto' }}>
          <Link to="/UserForm">Register</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
      {children}
    </>
  );
};
