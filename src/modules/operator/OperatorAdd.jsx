/** @format */
import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Grid, MenuItem, Container, FormControlLabel, Checkbox } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ToasterTypes, ParamTypes } from '../../helpers/config/constants.js'
import useToaster from '../../helpers/common/toaster.js'
import { useTranslation } from 'react-i18next'

// Custom components
import Phones from '../../components/common/Phones/Phones.jsx'

// Services
import { operatorService } from '../../services/operatorService.js'
import { commonService } from '../../services/commonService.js'


const OperatorAdd = () => {
  const { showToaster } = useToaster()

  const [docTypes, setDocTypes] = useState([])
  const [isLegal, setIsLegal] = useState(false)  
  const { t } = useTranslation()
  const formRef = useRef(null)

  useEffect(() => {
    loadDocTypes()
  }, [])

  const loadDocTypes = async () => {
    const response = await commonService.getParameters(ParamTypes.documentTypes)
    if (response) {
      const newDocTypes = response.map((i) => ({
        value: i,
        label: i,
      }))
      setDocTypes(newDocTypes)
    }
  }

  const handleValidSubmit = async (values) => {
    const nombres = `${values.firstName} ${values.lastName}`

    if (!isLegal) {
      delete values.legalName
      delete values.businessName
    }

    const body = JSON.stringify(values)
    try {
      const response = await operatorService.postOperator(body, isLegal)
      const { message } = response

      if (message) {
        showToaster(message, 'Error', ToasterTypes.Error)
      } else {
        showToaster('Operador creado satisfactoriamente!', nombres, ToasterTypes.Success)
        formRef.current?.resetForm()
      }
    } catch (error) {
      console.error('Error al crear el operador:', error)
      showToaster('Hubo un problema al procesar la solicitud', 'Error', ToasterTypes.Error)
    }
  }

  return (
    <Container>
      <Formik
        initialValues={{
          legalName: '',
          businessName: '',
          firstName: '',
          lastName: '',
          email: '',
          identification: {
            type: '',
            number: '',
          },
          phones: [
            {
              type: '',
              number: '',
            },
          ],
          profileType: {
            audit: false,
            consultancy: false,
            teaching: false,
          },
          isLegal,
        }}
        onSubmit={handleValidSubmit}
        innerRef={formRef}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <h1>Registrar Operador</h1>
                <hr />
              </Grid>

              <Grid item xs={12}>
                <div className="btn-group" role="group">
                  <Button
                    variant={isLegal ? 'contained' : 'outlined'}
                    onClick={() => {
                      setIsLegal(true)
                      setFieldValue('isLegal', true)
                    }}>
                    Legal
                  </Button>
                  <Button
                    variant={!isLegal ? 'contained' : 'outlined'}
                    onClick={() => {
                      setIsLegal(false)
                      setFieldValue('isLegal', false)
                    }}>
                    Natural
                  </Button>
                </div>
              </Grid>

              {isLegal && (
                <>
                  <Grid item xs={6}>
                    <Field as={TextField} label="Nombre legal" name="legalName" required fullWidth />
                    <ErrorMessage name="legalName" component="div" />
                  </Grid>
                  <Grid item xs={6}>
                    <Field as={TextField} label="Nombre comercial" name="businessName" required fullWidth />
                    <ErrorMessage name="businessName" component="div" />
                  </Grid>
                </>
              )}

              <Grid item xs={6}>
                <Field as={TextField} label="Nombres" name="firstName" required fullWidth />
                <ErrorMessage name="firstName" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} label="Apellidos" name="lastName" required fullWidth />
                <ErrorMessage name="lastName" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} label="Correo electrónico" type="email" name="email" required fullWidth />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={3}>
                <Field as={TextField} select label="Tipo documento" name="identification.type" required fullWidth>
                  <MenuItem value="Seleccione">
                    <em>Seleccione...</em>
                  </MenuItem>
                  {docTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="identification.type" component="div" />
              </Grid>
              <Grid item xs={3}>
                <Field as={TextField} label="Número de documento" name="identification.number" required fullWidth />
                <ErrorMessage name="identification.number" component="div" />
              </Grid>

              <Grid item xs={9}>
                <Phones name="phones" max={2} required />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="profileType.audit"
                      checked={values.profileType.audit}
                      onChange={() => {
                        setFieldValue('profileType.audit', !values.profileType.audit)
                      }}
                    />
                  }
                  label="Entidad Auditoria"
                />
              </Grid>

              <Grid item  xs={4}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="profileType.consultancy"
                      checked={values.profileType.consultancy}
                      onChange={() => {
                        setFieldValue('profileType.consultancy', !values.profileType.consultancy)
                      }}
                    />
                  }
                  label="Entidad Consultora"
                />
              </Grid>

              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="profileType.teaching"
                      checked={values.profileType.teaching}
                      onChange={() => {
                        setFieldValue('profileType.teaching', !values.profileType.teaching)
                      }}
                    />
                  }
                  label="Entidad Capacitadora"
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Registrar Operador
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default OperatorAdd
