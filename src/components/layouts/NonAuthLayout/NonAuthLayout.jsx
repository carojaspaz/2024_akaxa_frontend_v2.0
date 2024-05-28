/** @format */

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import Footer from '../../common/Footer/Footer'

const NonAuthLayout = ({ children }) => {
  let location = useLocation()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }
  useEffect(() => {
    let currentPage = capitalizeFirstLetter(location.pathname)
    document.title = currentPage + ' | Safety & Trust'
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default NonAuthLayout
