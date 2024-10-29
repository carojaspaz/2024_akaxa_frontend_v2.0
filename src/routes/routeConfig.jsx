/** @format */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage, LogoutPage } from '../modules/auth'
import { HomePage } from '../modules/home'
import { ClientPage, ClientList, ClientAdd, ClientDetail } from '../modules/client'
import { NotFoundPage } from '../modules/common'
import { OperatorPage, OperatorAdd, OperatorList, OperatorDetail } from '../modules/operator'

const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/logout', component: <LogoutPage /> },
  { path: '/404', component: <NotFoundPage /> },
]

const privateRoutes = [
  { path: '/home', component: <HomePage /> },
  { path: '/clients', component: <ClientPage /> },
  { path: '/clients/addClient', component: <ClientAdd /> },
  { path: '/clients/listClients', component: <ClientList /> },
  { path: '/clients/clientDetail', component: <ClientDetail/> },
  { path: '/operators', component: <OperatorPage /> },
  { path: '/operators/addOperator', component: <OperatorAdd /> },
  { path: '/operators/listOperators', component: <OperatorList /> },
  { path: '/operators/operatorDetail', component: <OperatorDetail/> },
  { path: "/", exact: true, component: <Navigate to="/home" /> }
]

export { publicRoutes, privateRoutes }
