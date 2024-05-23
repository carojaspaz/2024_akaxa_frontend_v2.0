/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const CustomButton = styled(Button)`
  margin-top: 20px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('*').email('*'),
  password: Yup.string().required('*'),
})

const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true)
    // Aquí deberías reemplazar esto con una verificación real, por ejemplo, una llamada a una API
    if (values.username === 'admin@yopmail.com' && values.password === 'password') {
      sessionStorage.setItem('auth', 'true')
      setSubmitting(false)
      navigate('/home') // Cambia a la ruta que quieras redirigir después de un inicio de sesión exitoso
    } else {
      setErrors({ password: 'Invalid username or password' })
    }
    setSubmitting(false)
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('login.title')}
          </Typography>
          <Formik initialValues={{ username: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Box mb={2}>
                  <Field as={TextField} fullWidth label={t('login.username')} name="username" variant="outlined" error={Boolean(ErrorMessage.name === 'username')} helperText={<ErrorMessage name="username" />} />
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
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default LoginPage
