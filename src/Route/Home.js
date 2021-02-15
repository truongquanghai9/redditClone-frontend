import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BrowseSub from '../Body/BrowseSub.js';
import CreatePostSub from '../Body/CreatePostSub.js';
import Posts from '../Body/Posts.js';
import SinglePost from '../Body/SinglePost';

import './Home.css';
const Home = props => {
  const { location, history } = props;
  const [posts, setPosts] = useState([]);
  const [login, isLogin] = useState(false);
  const [logout, isLogout] = useState(false);
  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
    if (
      location.state !== undefined &&
      location.state.login === true &&
      location.state.expiresAt <= Date.now()
    ) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: location.state.refreshToken,
          username: location.state.username
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
    }
    if (location.state !== undefined) {
      if (location.state.login === true) {
        isLogin(true);
      }
      if (location.state.logout === true) {
        isLogout(true);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLogin(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [login]);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLogout(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [logout]);

  return (
    <div className='container'>
      {login === true && <h3 className='error'>Logged In</h3>}
      {logout === true && <h3 className='error'>Logged Out</h3>}
      <div className='posts-container'>
        <Posts posts={posts} />
      </div>
      <div className='side-container'>
        <div className='create-post-subreddit'>
          <CreatePostSub posts={posts} />
        </div>
        <div className='browse-subreddit'>
          <BrowseSub posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
