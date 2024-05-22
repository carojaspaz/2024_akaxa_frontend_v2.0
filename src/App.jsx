/** @format */

import React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { createAppTheme, GlobalStyle } from './assets/styles/theme'

import useThemeStore from './store/themeStore'

import AppRouter from './routes/route'
import { LanguageSelector } from './components/common'

const App = () => {
  const { theme, toggleTheme } = useThemeStore()
  const muiTheme = createAppTheme(theme)

  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <button onClick={toggleTheme}>Toggle Theme</button>
        <LanguageSelector />
        <AppRouter />
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
