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
            <Field as={TextField} label="Nombre" name="contacts.name" fullWidth />
          </Grid>
          <Grid item xs={5}>
            <Field as={TextField} label="Cargo" name="contacts.position" fullWidth />
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined">+</Button>
          </Grid>
          <Grid item xs={6}>
            <Field as={TextField} label="Correo electrónico" type="email" name="contacts.email" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Grid item xs={12}>
              <Phones name="phone" />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

export default ContactClient
