/** @format */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routeConfig'

import AppRoutePrivate from './routePrivate'

import useLayoutStore from '../store/layoutStore'
import { NonAuthLayout, HorizontalLayout, VerticalLayout } from '../components/layouts'

const AppRouter = () => {
  const { layout, setLayout, layouts } = useLayoutStore()
  const getLayout = () => {
    if (layout === layouts.HorizontalLayout) return <HorizontalLayout />
    return <VerticalLayout />
  }
  
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        {privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<AppRoutePrivate />}>
            <Route path="" element={ <VerticalLayout>{route.component}</VerticalLayout> } />
          </Route>
        ))}
      </Routes>
    </Router>
  )
}

export default AppRouter
