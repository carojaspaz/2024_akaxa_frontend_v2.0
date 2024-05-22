/** @format */

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bodyBg};
    color: ${(props) => props.theme.textColor};
  }
`

export { GlobalStyle }
