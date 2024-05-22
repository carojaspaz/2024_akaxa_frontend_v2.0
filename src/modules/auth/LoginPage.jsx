/** @format */

import React from 'react'

const LoginPage = () => {
  const handleLogin = () => {
    sessionStorage.setItem('auth', 'true')
    window.location.href = '/home'
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage
