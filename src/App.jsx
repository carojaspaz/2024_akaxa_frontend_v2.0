/** @format */

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/css/theme'

import { useThemeStore } from './store/themeStore'

import AppRouter from './routes/route'
import { LanguageSelector } from './components/common'

const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <button onClick={toggleTheme}>Toggle Theme</button>
      <LanguageSelector />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
