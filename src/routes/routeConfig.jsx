/** @format */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage, LogoutPage } from '../modules/auth'
import { HomePage } from '../modules/home'
import { ClientPage, ClientList, ClientAdd } from '../modules/client'
import { NotFoundPage } from '../modules/common'

const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/logout', component: <LogoutPage /> },
  { path: '/404', component: <NotFoundPage /> },
]

const privateRoutes = [
  { path: '/home', component: <HomePage /> },
  { path: '/clients', component: <ClientPage /> },
  { path: '/addClient', component: <ClientAdd /> },
  { path: '/listClients', component: <ClientList /> },
  { path: "/", exact: true, component: <Navigate to="/home" /> }
]

export { publicRoutes, privateRoutes }
