/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import styled from 'styled-components'

const CustomButton = styled(Button)`
  margin-top: 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('login.title')}
        </Typography>
        <form>
          <Box mb={2}>
            <TextField fullWidth label={t('login.username')} name="username" variant="outlined" />
          </Box>
          <Box mb={2}>
            <TextField fullWidth label={t('login.password')} type="password" name="password" variant="outlined" />
          </Box>
          <CustomButton variant="contained" color="secondary" type="submit">
            {t('login.loginButton')}
          </CustomButton>
        </form>
      </Box>
    </Container>
  )
}

export default LoginPage
