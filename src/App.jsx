/** @format */

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/css/theme'

import { useThemeStore } from './store/themeStore'

import { HomePage } from './Modules/home'

const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <HomePage />
    </ThemeProvider>
  )
}

export default App
