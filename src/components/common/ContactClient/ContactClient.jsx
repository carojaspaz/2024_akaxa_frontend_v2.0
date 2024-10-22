/** @format */

import React, { useState } from 'react'
import { TextField, Button, Grid, MenuItem } from '@mui/material'
import { Field, FieldArray } from 'formik'
import { TypePhone } from '../../../helpers/config/constants'
import useToaster from '../../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'

const ContactClient = ({ name, max }) => {
  const { t } = useTranslation()

  return (
    <FieldArray name={name}>
      {({ push, remove, form }) => {
        const contacts = form.values.contacts || []

        return (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h3>Datos de Contacto</h3>
            </Grid>

            {contacts.map((contact, index) => (
              <React.Fragment key={index}>
                <Grid item xs={5}>
                  <Field as={TextField} label="Nombre" name={`${name}[${index}].name`} fullWidth />
                </Grid>
                <Grid item xs={5}>
                  <Field as={TextField} label="Cargo" name={`${name}[${index}].position`} fullWidth />
                </Grid>
                <Grid item xs={2}>
                  {contacts.length > 1 && (
                    <Button variant="contained" color="error" onClick={() => remove(index)}>
                      Eliminar
                    </Button>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Field as={TextField} label="Correo electrónico" type="email" name={`${name}[${index}].email`} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <Field as={TextField} select label="Tipo" name={`${name}[${index}].phone.type`} fullWidth>
                    <MenuItem value="">{t('Seleccione...')}</MenuItem>
                    <MenuItem value={TypePhone.movil}>{t('Móvil')}</MenuItem>
                    <MenuItem value={TypePhone.land}>{t('Fijo')}</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={3}>
                  <Field as={TextField} label="Número" name={`${name}[${index}].phone.number`} fullWidth />
                </Grid>
              </React.Fragment>
            ))}

            {contacts.length < max && (
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => push({ name: '', position: '', email: '', phone: { type: '', number: '' } })}>
                  Agregar otro contacto
                </Button>
              </Grid>
            )}
          </Grid>
        )
      }}
    </FieldArray>
  )
}

export default ContactClient
