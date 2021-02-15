import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import logo from '../Image/reddit-logo.png';
const Header = props => {
  console.log(props);
  const { history, location } = props;
  const [authentication, setAuthentication] = useState({
    authenticationToken: '',
    expiresAt: '',
    login: false,
    username: '',
    refreshToken: ''
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const node = useRef();

  const handleMouseClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShowDropDown(false);
  };

  const handleClick = () => {
    if (location.pathname !== '/') {
      setShowDropDown(false);
      history.push({
        pathname: '/',
        state: {
          login: authentication.login,
          authenticationToken: authentication.authenticationToken,
          refreshToken: authentication.refreshToken,
          expiresAt: authentication.expiresAt,
          username: authentication.username
        }
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (location.state !== undefined) {
      setAuthentication({
        authenticationToken: location.state.authenticationToken,
        expiresAt: location.state.expiresAt,
        login: location.state.login,
        username: location.state.username,
        refreshToken: location.state.refreshToken
      });
    }
  }, [location]);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, []);
  return (
    <header className='navbar'>
      <ul className='navbar-nav'>
        <li className='navbar-logo'>
          <div cursor='pointer' onClick={() => handleClick()}>
            <img className='app-logo' src={logo} alt='logo' />
          </div>
        </li>
        <li>
          <input
            className='searchBar'
            type='text'
            name='name'
            placeholder='Search'
          />
        </li>
        <div ref={node}>
          {authentication.login ? (
            <ul className='navbar-security'>
              <button onClick={() => setShowDropDown(!showDropDown)}>
                {authentication.username}
              </button>
              {showDropDown && (
                <div className='nav-dropdown'>
                  <ul className='dropdown'>
                    <li className='dropdown-link'>
                      <p
                        className='toProfile'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setShowDropDown(false);
                          history.push({ ...location, pathname: '/profile' });
                        }}
                      >
                        Profile
                      </p>
                    </li>
                    <li className='dropdown-link'>
                      <Link
                        to={{
                          pathname: '/logout',
                          state: {
                            authentication: authentication
                          }
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          ) : (
            <ul className='navbar-security'>
              <li className='navbar-security-registration'>
                <Link className='header-link' to='/login'>
                  Log In
                </Link>
              </li>
              <li className='navbar-security-registration'>
                <Link className='header-link' id='signup' to='/signup'>
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </ul>
    </header>
  );
};

export default withRouter(Header);
