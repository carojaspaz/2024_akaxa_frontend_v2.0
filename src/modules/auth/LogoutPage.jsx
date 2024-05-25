/** @format */

import React, { useEffect } from 'react'

import useAuth from '../../hooks/useAuth'


const LogoutPage = () => {
  const { handleLogout } = useAuth()


  useEffect(() => {
    handleLogout()
  }, [])

  return <React.Fragment></React.Fragment>
}

export default LogoutPage
