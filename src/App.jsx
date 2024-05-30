/** @format */

import React from 'react'

import ThemeProvider from './theme'

import GlobalStyles from './theme/GlobalStyles'

import AppRouter from './routes/router'

const App = () => {

  return (
    <ThemeProvider>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
