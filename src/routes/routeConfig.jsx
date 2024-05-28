/** @format */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage, LogoutPage } from '../modules/auth'
import { HomePage } from '../modules/home'
import { ClientPage } from '../modules/client'

const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/logout', component: <LogoutPage /> },
]

const privateRoutes = [
  { path: '/home', component: <HomePage /> },
  { path: '/clients', component: <ClientPage /> },
  { path: "/", exact: true, component: <Navigate to="/home" /> }
]

export { publicRoutes, privateRoutes }
