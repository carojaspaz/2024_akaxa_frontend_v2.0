/** @format */

import React from 'react'

import ThemeProvider from './theme'

import useThemeStore from './store/themeStore'

import AppRouter from './routes/router'

const App = () => {
  const { theme } = useThemeStore()

  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
