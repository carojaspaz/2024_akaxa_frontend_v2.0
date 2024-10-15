/** @format */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, MenuItem } from '@mui/material'
import { Form, FieldArray, Field } from 'formik'
import useToaster from '../../../helpers/common/toaster'
import { ToasterTypes, Patterns, TypePhone } from '../../../helpers/config/constants'
import { useTranslation } from 'react-i18next'

const Phones = ({ max = 4, phonesProp = [{ type: '', number: '' }] }) => {
  const { showToaster } = useToaster()
  const { t } = useTranslation()
  const [phones, setPhones] = useState(phonesProp)
  const [patterns, setPatterns] = useState([''])
  const [placeHolders, setPlaceHolders] = useState([''])

  useEffect(() => {
    setPhones(phonesProp)
  }, [phonesProp])

  const handleAddPhone = (arrayHelpers) => {
    if (phones.length < max) {
      arrayHelpers.push({ type: '', number: '' })
    } else {
      showToaster(`${max} Teléfonos máximo`, 'Teléfonos', ToasterTypes.Info)
    }
  }

  const handleRemovePhone = (index, arrayHelpers) => {
    if (phones.length >= 1) {
      arrayHelpers.remove(index)
    }
  }

  const onChangePhoneType = (index, event, setFieldValue) => {
    let typePhone = ''
    let placeHolder = ''
    switch (event.target.value) {
      case TypePhone.movil:
        typePhone = Patterns.movilPattern
        placeHolder = Patterns.movilPlaceholder
        break
      case TypePhone.land:
        typePhone = Patterns.landPattern
        placeHolder = Patterns.landPlaceholder
        break
      default:
        typePhone = ''
        placeHolder = ''
        break
    }

    setFieldValue(`phones[${index}].number`, '')
    setPatterns((prev) => {
      const updatedPatterns = [...prev]
      updatedPatterns[index] = typePhone
      return updatedPatterns
    })
    setPlaceHolders((prev) => {
      const updatedPlaceholders = [...prev]
      updatedPlaceholders[index] = placeHolder
      return updatedPlaceholders
    })
  }

  return (
    <Container>
      <Form>
        <FieldArray
          name="phones"
          render={(arrayHelpers) => (
            <div>
              {values.phones.map((phone, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={5}>
                    <Field
                      name={`phones[${index}].type`}
                      as={TextField}
                      select
                      label={t('Type')}
                      fullWidth
                      onChange={(e) => {
                        setFieldValue(`phones[${index}].type`, e.target.value)
                        onChangePhoneType(index, e, setFieldValue)
                      }}
                      value={phone.type}>
                      <MenuItem value="">{t('Seleccione...')}</MenuItem>
                      <MenuItem value={TypePhone.movil}>{t('Movil')}</MenuItem>
                      <MenuItem value={TypePhone.land}>{t('Land')}</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={4}>
                    <Field name={`phones[${index}].number`} as={TextField} label={t('Number')} placeholder={placeHolders[index]} pattern={patterns[index]} fullWidth value={phone.number} />
                  </Grid>

                  <Grid item xs={3}>
                    {index > 0 ? (
                      <Button type="button" onClick={() => handleRemovePhone(index, arrayHelpers)} variant="contained" color="secondary">
                        {t('Remove')}
                      </Button>
                    ) : (
                      <Button type="button" onClick={() => handleAddPhone(arrayHelpers)} variant="contained" color="primary">
                        {t('Add')}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              ))}
            </div>
          )}
        />
      </Form>
    </Container>
  )
}

export default Phones
