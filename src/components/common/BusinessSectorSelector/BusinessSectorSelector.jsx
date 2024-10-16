/** @format */
import React, { useState, useRef } from 'react'
import { TextField, Button, Grid, MenuItem, Container } from '@mui/material'
import { Form, Field } from 'formik'
import { useTranslation } from 'react-i18next'
//import InputMask from 'react-input-mask'
// Services
//import { inspectionService } from '../../services/inspectionService'
//i18n
//import { withNamespaces } from 'react-i18next'

const BusinessSectorSelector = ({ max }) => {
  const [contacts, setContacts] = useState([])
  const formRef = useRef(null)
  const { t } = useTranslation()
  const modal = false
  const toggleModal = () => {}
  const handleActivity = () => {}
  const onChangeActivity = (selectedOptions) => {}

  return (
    <Container>
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h3>Actividad Económica</h3>
          </Grid>
          <Grid item xs={12}>
            <Field as={TextField} label="Descripción de la actividad económica" name="codeCIIU.activity" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} select label="Seleccione el Sector" name="codeCIIU.sector" fullWidth>
              <MenuItem value="Seleccione">
                <em>Seleccione...</em>
              </MenuItem>
              <MenuItem value="Construcción">Construcción</MenuItem>
              <MenuItem value="Educación">Educación</MenuItem>
              <MenuItem value="Otras Actividades de Servicios">Otras Actividades de Servicios</MenuItem>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} select label="Seleccione División" name="codeCIIU.division" fullWidth>
              <MenuItem value="Todas">
                <em>Todas</em>
              </MenuItem>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} select label="Seleccione Subdivisión" name="codeCIIU.subdivision" fullWidth>
              <MenuItem value="Todas">
                <em>Todas</em>
              </MenuItem>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              as={TextField}
              select
              label="Seleccione Actividad"
              name="codeCIIU.activity"
              onChange={(event) => {
                const selectedValue = event.target.value
                const selectedOptions = activityOptions.filter((option) => option.value === selectedValue)
                onChangeActivity(selectedOptions)
              }}
              fullWidth>
              <MenuItem value="Todas">
                <em>Todas</em>
              </MenuItem>
            </Field>
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

export default BusinessSectorSelector
