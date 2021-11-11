import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Main = () => {
  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  const getCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('code', urlParams.get('code'));
    return urlParams.get('code');
  };

  const notLoggedInHtml = () => {
    return (
      <div>
        <div>Not logged in!</div>
        <Link to='/'>login</Link>
      </div>
    );
  };

  return (
    <div><Dashboard code={getCode()} /></div>
  );
};

export default Main;
