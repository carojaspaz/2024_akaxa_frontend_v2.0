/** @format */

import React, { useRef } from 'react'
import { Container, Grid, TextField, Button, Card, CardContent, MenuItem } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

// Custom components
import Phones from '../../components/common/Phones/Phones.jsx'

// Toaster
import { ToasterTypes } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'

// Service
import { profileService } from '../../services/profileService.js'

const AdminRegister = () => {
  const { t } = useTranslation()
  const formRef = useRef(null)
  const { showToaster } = useToaster()

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('Field Required')),
    lastName: Yup.string().required(t('Field Required')),
    email: Yup.string().email(t('Invalid Email')).required(t('Field Required')),
    identification: Yup.object({
      type: Yup.string().required(t('Select Required')),
      number: Yup.string().required(t('Field Required')),
    }),
  })

  const handleSubmit = async (values, { resetForm }) => {
    const fullName = `${values.firstName} ${values.lastName}`
    const body = JSON.stringify(values)

    try {
      const response = await profileService.postProfileAdmin(body)
      if (response.message) {
        showToaster(response.message, 'Error', ToasterTypes.Error)
      } else {
        resetForm()
        showToaster('Administrator created successfully', 'Success', { name: fullName }, ToasterTypes.Success)
      }
    } catch (error) {
      showToaster('An unexpected error occurred', 'Error', ToasterTypes.Error)
    }
  }

  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <Formik
            innerRef={formRef}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              identification: { type: '', number: '' },
              phones: [
                {
                  type: '',
                  number: '',
                },
              ],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <h1>Registrar Administrador</h1>
                    <hr />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="firstName" as={TextField} fullWidth label="Nombre" variant="outlined" onChange={handleChange} onBlur={handleBlur} error={!!ErrorMessage.firstName} helperText={<ErrorMessage name="firstName" />} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field name="lastName" as={TextField} fullWidth label="Apellido" variant="outlined" onChange={handleChange} onBlur={handleBlur} error={!!ErrorMessage.lastName} helperText={<ErrorMessage name="lastName" />} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field name="email" as={TextField} fullWidth label="Correo Electrónico" variant="outlined" type="email" onChange={handleChange} onBlur={handleBlur} error={!!ErrorMessage.email} helperText={<ErrorMessage name="email" />} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Field
                      name="identification.type"
                      as={TextField}
                      select
                      fullWidth
                      label="Tipo" 
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!ErrorMessage.identification?.type}
                      helperText={<ErrorMessage name="identification.type" />}>
                      <MenuItem value="">"Seleccione"</MenuItem>
                      <MenuItem value="CC">CC</MenuItem>
                      <MenuItem value="CE">CE</MenuItem>
                      <MenuItem value="Passport">{t('Passport')}</MenuItem>
                      <MenuItem value="Nit">Nit</MenuItem>
                      <MenuItem value="Rut">Rut</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Field
                      name="identification.number"
                      as={TextField}
                      fullWidth
                      label="Identificación" 
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!ErrorMessage.identification?.number}
                      helperText={<ErrorMessage name="identification.number" />}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Phones name="phones" max={2} required />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    Registrar Administrador
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  )
}

export default AdminRegister
