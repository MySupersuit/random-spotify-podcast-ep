import React from 'react';
import { Navbar } from 'react-bootstrap';
import classes from './Navigation.module.css';

const Navigation = () => {
  return (
    <Navbar style={{ 'backgroundColor': '#1DB954' }} expand='lg'>
      <Navbar.Brand className='mx-auto'>
        <span className={classes.navbarHeader}>Random Spotify Podcast Episodes</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;
