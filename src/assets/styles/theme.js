/** @format */

import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material/styles'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.palette.background.default};
    color: ${(props) => (props.theme.palette.mode === 'light' ? '#000' : '#fff')};
  }
`

const createAppTheme = (theme) => createTheme(theme)

export { GlobalStyle, createAppTheme }
