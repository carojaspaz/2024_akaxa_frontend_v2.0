/** @format */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import useAuth from '../../hooks/useAuth'
import useSnackbar from '../../hooks/useSnackbar'

const CustomButton = styled(Button)`
  margin-top: 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('*').email('*'),
  password: Yup.string().required('*'),
})

const LoginPage = () => {
  const { t } = useTranslation()
  const { handleLogin, error, isAutenticated } = useAuth()
  const { open, message, showSnackbar, handleClose } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAutenticated) {
      navigate('/home')
    }
  },[isAutenticated, navigate])
  
  useEffect(() => {
    if (error) {
      showSnackbar(error)
    }
  }, [error, showSnackbar])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await handleLogin(values.email, values.password)
      resetForm()
      setSubmitting(false)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors)
      } else {
        showSnackbar(err.message || 'An error occurred')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('login.title')}
          </Typography>
          <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Box mb={2}>
                  <Field as={TextField} fullWidth label={t('login.email')} name="email" variant="outlined" error={Boolean(ErrorMessage.name === 'email')} helperText={<ErrorMessage name="email" />} />
                </Box>
                <Box mb={2}>
                  <Field as={TextField} fullWidth label={t('login.password')} type="password" name="password" variant="outlined" error={Boolean(ErrorMessage.name === 'password')} helperText={<ErrorMessage name="password" />} />
                </Box>
                <CustomButton variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
                  {t('login.loginButton')}
                </CustomButton>
              </Form>
            )}
          </Formik>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default LoginPage
