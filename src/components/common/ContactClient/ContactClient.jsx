/** @format */
import React, { useState, useRef } from 'react'
import { TextField, Button, Grid, MenuItem, Container } from '@mui/material'
import { Form, Field } from 'formik'
import { ToasterTypes, ParamTypes, Patterns, TypePhone } from '../../../helpers/config/constants'
import useToaster from '../../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'

const ContactClient = ({ max }) => {
  const [contacts, setContacts] = useState([])
  const formRef = useRef(null)
  const { t } = useTranslation()
  const modal = false
  const toggleModal = () => {}
  const handleValidSubmit = () => {}
  const handleActivity = () => {}

  return (
    <Container>
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h3>Datos de Contacto</h3>
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} label="Nombre" name="contactName" fullWidth />
          </Grid>
          <Grid item xs={5}>
            <Field as={TextField} label="Cargo" name="positionName" fullWidth />
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined">+</Button>
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} label="Correo electrónico" type="email" name="emailContact" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Field as={TextField} select label="Tipo de Teléfono" name="typePhone" fullWidth>
              <MenuItem value="Seleccione">
                <em>Seleccione...</em>
              </MenuItem>
              <MenuItem value="Celular">Celular</MenuItem>
              <MenuItem value="Telefono fijo">Teléfono fijo</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Field>
          </Grid>
          <Grid item xs={3}>
            <Field as={TextField} label="Número" name="phoneNumber" fullWidth />
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

export default ContactClient
