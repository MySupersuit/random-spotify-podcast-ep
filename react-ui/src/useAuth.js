import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const baseUrl = ""

  useEffect(() => {
    const url = `${baseUrl}/login`
    axios
      .post(`${url}`, {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        Cookies.set('spotifyAccessToken', res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch(err => {
        console.log('login err', err);
        Cookies.set('spotifyAccessToken', '');
        // window.location = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${baseUrl}/refresh`, {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken);
          Cookies.set('spotifyAccessToken', res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(err => {
          console.log('refresh err', err);
          Cookies.set('spotifyAccessToken', '');
          // window.location = '/';
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
