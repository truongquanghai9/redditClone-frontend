import react, { useState, useEffect } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
const Logout = () => {
  let history = useHistory();
  let location = useLocation();
  const { refreshToken, username } = location.state.authentication;
  //useEffect(() => {
  useEffect(() => {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: refreshToken,
        username: username
      })
    })
      .then(response => {
        if (response.ok) {
          history.push({
            pathname: '/',
            state: {
              login: false,
              logout: true,
              authenticationToken: '',
              refreshToken: '',
              expiresAt: '',
              username: ''
            }
          });
        } else {
          history.push('/');
        }
      })
      .catch(error => {
        console.log('There was an error!', error);
      });
  }, []);

  //});
  return null;
};

export default Logout;
