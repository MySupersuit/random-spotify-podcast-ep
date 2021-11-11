import React from 'react';
import Container from 'react-bootstrap/Container';
require('dotenv').config();

const Login = () => {
  // const REDIRECT_URI = 'https://intense-eyrie-61400.herokuapp.com/main';
  // const LOCAL_REDIRECT_URI = 'http://localhost:3001/main';
  const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=user-read-private%20user-read-email&redirect_uri=${process.env.REDIRECT_URI}&show_dialog=false`;

  return (
    <Container
      className='d-flex justify-content-center 
        align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <a
        className='btn btn-lg'
        style={{ backgroundColor: '#1DB954', color: '#191414' }}
        href={AUTH_URL}
      >
        Login with Spotify
      </a>
    </Container>
  );
};

export default Login;
