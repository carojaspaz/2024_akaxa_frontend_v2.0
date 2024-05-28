/** @format */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'

import { AppBar, Drawer } from './AppBar'
import Footer from '../../common/Footer/Footer'
import { SearchBar, SearchIconWrapper, StyledInputBase } from '../../common/SearchBar/SearchBar'
import ProfileMenu from '../../common/Profile/ProfileMenu'

const VerticalLayout = ({ children }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
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
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {t('layout.home')}
          </Typography>
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </SearchBar>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default VerticalLayout
