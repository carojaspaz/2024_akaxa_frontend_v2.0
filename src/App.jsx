/** @format */

import React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { createAppTheme, GlobalStyle } from './assets/styles/theme'

import useThemeStore from './store/themeStore'

import AppRouter from './routes/route'

const App = () => {
  const { theme } = useThemeStore()
  const muiTheme = createAppTheme(theme)

  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
