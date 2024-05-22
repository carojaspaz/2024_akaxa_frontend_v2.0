/** @format */

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/css/theme'

import { useThemeStore } from './store/themeStore'

import AppRouter from './routes/route'


const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
