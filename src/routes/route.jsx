/** @format */

import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { authProtectedRoutes, publicRoutes } from './routeConfig'

import useLayoutStore from '../store/layoutStore'

import { NonAuthLayout, VerticalLayout } from '../components/layouts'

const AppRouter = () => {
  const { layout, setLayout, layouts } = useLayoutStore()
  const isAuthenticated = !!sessionStorage.getItem('auth')

  const getLayoutComponent = (Component) => {
    if(!isAuthenticated) return <NonAuthLayout><Component /></NonAuthLayout>
    if(layout === layouts.VerticalLayout) return <VerticalLayout><Component /></VerticalLayout>
    if(layout === layouts.HorizontalLayout) return <HorizontalLayout><Component /></HorizontalLayout>
    return null;
  }

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={getLayoutComponent(route.component)} />
        ))}
        {authProtectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={isAuthenticated ? getLayoutComponent(route.component) : <Navigate to="/login" />} />
        ))}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/login'} />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
