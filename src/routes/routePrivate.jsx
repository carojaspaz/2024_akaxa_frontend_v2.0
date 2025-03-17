/** @format */

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AppRoutePrivate = () => {
    const auth = !!sessionStorage.getItem('auth')
    return auth? <Outlet/> : <Navigate to="/login" replace/>
}

export default AppRoutePrivate
