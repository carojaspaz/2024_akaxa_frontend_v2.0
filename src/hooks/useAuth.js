/** @format */

import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'

import { login } from '../services/authService'

const useAuth = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (username, password) => {
    setError(null)
    try {
      const data = await login(username, password)
      const decodedToken = jwtDecode(data.token)

      const currentTime = Date.now() / 1000
      if (decodedToken.exp < currentTime) {
        const err = new Error('Token has expired');
        setError(err.message);
        throw err;
      } else {
        sessionStorage.setItem('auth', 'true')
        sessionStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return {
    handleLogin,
    handleLogout,
    error,
  }
}

export default useAuth
