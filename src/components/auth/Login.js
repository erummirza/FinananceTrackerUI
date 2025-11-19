import React from 'react';
import LoginUser from '../user/LoginUser';

function Login() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'purple' }}>Login Page</h1>
      <LoginUser/>
      <p>Authentication will be handled here.</p>
    </div>
  );
}

export default Login;