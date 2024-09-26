/** @format */

import { useContext } from 'react'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import AuthContext from '../contexts/AuthContext'
import { loginService } from '../services/authService'
import { auth } from '../_mock/account'

const useAuth = () => {
  const { authState, login, logout } = useContext(AuthContext)
  const [error, setError] = useState(null)

  const handleLogin = async (username, password) => {
    setError(null)
    try {
      //const data = await loginService(username, password)
      const data = auth
      const decodedToken = jwtDecode(data.token)
      const currentTime = Date.now() / 1000
      if (decodedToken.exp < currentTime) {
        const err = new Error('Token has expired')
        setError(err.message)
        throw err
      } else {      
        login(data)
      }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleLogout = () => {
    logout()
  }

  return {
    authState,
    handleLogin,
    handleLogout,
    error,
  }
}

export default useAuth
