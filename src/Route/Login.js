import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Login = props => {
  const { history, location } = props;
  const user = {
    username: '',
    password: ''
  };

  const [loginInfo, changeLoginInfo] = useState(user);
  const [flag, setFlag] = useState(1);
  const handleChange = e => {
    e.preventDefault();
    const username = e.target.name;
    const value = e.target.value;
    changeLoginInfo({ ...loginInfo, [username]: value });
  };

  const handleLogin = data => {
    history.push({
      pathname: '/',
      state: {
        login: true,
        logout: false,
        authenticationToken: data.authenticationToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        username: data.username
      }
    });
  };

  const submitLogin = event => {
    event.preventDefault();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginInfo.username,
        password: loginInfo.password
      })
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) {
          handleLogin(data);
        } else {
          setFlag(-1);
          history.push('/login');
        }
      })
      .catch(error => {
        this.setError({ errorMessage: error.toString() });
        console.log('there was an error!', error);
      });
  };

  return (
    <>
      {flag === -1 && (
        <h3 style={{ color: 'red' }}>Username/Password incorrect</h3>
      )}
      <div className='panel-heading'>
        <div className='panel-title'>Sign In</div>
      </div>
      <form onSubmit={submitLogin}>
        <div style={{ marginBottom: 25 }} className='input-group'>
          <span className='input-group-addon'>
            <i className='glyphicon glyphicon-user'></i>
          </span>
          <input
            type='text'
            name='username'
            placeholder='username'
            className='form-control'
            value={loginInfo.username}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 25 }} className='input-group'>
          <span className='input-group-addon'>
            <i className='glyphicon glyphicon-lock'></i>
          </span>
          <input
            type='password'
            name='password'
            placeholder='password'
            className='form-control'
            value={loginInfo.password}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 10 }} className='form-group'>
          <div className='col-sm-6 controls'>
            <button type='submit' className='btn btn-success'>
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
