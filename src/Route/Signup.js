import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.css';
const Signup = () => {
  let history = useHistory();
  const info = { email: '', password: '', username: '' };
  const [signupInfo, setSignupInfo] = useState(info);
  const [flag, setFlag] = useState(1);
  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signupInfo.username,
        password: signupInfo.password,
        email: signupInfo.email
      })
    })
      .then(async response => {
        if (response.ok) {
          history.push({
            pathname: '/login',
            state: {
              message: 'Verification link has been sent to your email'
            }
          });
        } else {
          setFlag(-1);
          history.push('/signup');
        }
      })
      .catch(error => {
        console.log('there was an error!', error);
      });
  };

  return (
    <div className='signup-container'>
      {flag === -1 && (
        <h1 style={{ color: 'red' }}>Please choose another username</h1>
      )}
      <form className='signup-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <input
            name='username'
            type='text'
            value={signupInfo.username}
            onChange={handleChange}
            placeholder='username'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            name='password'
            type='text'
            value={signupInfo.password}
            onChange={handleChange}
            placeholder='password'
          />
        </div>
        <div className='form-group'>
          <label>email</label>
          <input
            name='email'
            type='text'
            value={signupInfo.email}
            onChange={handleChange}
            placeholder='email'
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
