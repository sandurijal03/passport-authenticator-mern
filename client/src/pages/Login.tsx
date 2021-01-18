import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    // e.preventDefault();
    axios
      .post(
        'http://localhost:3001/api/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then(
        (res: AxiosResponse) => {
          if (res.data === 'success') {
            window.location.href = '/';
          }
        },
        () => console.log('rejected'),
      );
  };

  return (
    <div>
      <h1>LoginPage</h1>
      <input
        type='text'
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' onClick={handleSubmit}>
        login
      </button>
    </div>
  );
};

export default Login;
