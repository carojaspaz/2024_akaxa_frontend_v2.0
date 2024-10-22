/** @format */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FieldArray, useFormikContext } from 'formik'

// Helpers
import { ToasterTypes, Patterns, TypePhone } from '../../../helpers/config/constants'
import useToaster from '../../../helpers/common/toaster'

const Phones = ({ max = 4, name }) => {
  const { showToaster } = useToaster()
  const { t } = useTranslation()
  const { values, setFieldValue } = useFormikContext()

  const [patterns, setPatterns] = useState([''])
  const [placeHolders, setPlaceHolders] = useState([''])

  const handleAddPhone = (arrayHelpers) => {
    if (values.phones.length < max) {
      arrayHelpers.push({ type: '', number: '' })
      setPatterns([...patterns, ''])
      setPlaceHolders([...placeHolders, ''])
    } else {
      showToaster(`${max} ${t('Teléfonos máximo')}`, 'Teléfonos', ToasterTypes.Info)
    }
  }

  const handleRemovePhone = (index, arrayHelpers) => {
    if (values.phones.length > 1) {
      arrayHelpers.remove(index)
      setPatterns(patterns.filter((_, i) => i !== index))
      setPlaceHolders(placeHolders.filter((_, i) => i !== index))
    }
  }

  const onChangePhone = (index, e) => {
    const phoneType = e.target.value
    setFieldValue(`${name}[${index}].type`, phoneType)

    const updatedPatterns = [...patterns]
    const updatedPlaceholders = [...placeHolders]
    
    switch (phoneType) {
      case TypePhone.movil:
        updatedPatterns[index] = Patterns.movilPattern
        updatedPlaceholders[index] = Patterns.movilPlaceholder
        break
      case TypePhone.land:
        updatedPatterns[index] = Patterns.landPattern
        updatedPlaceholders[index] = Patterns.landPlaceholder
        break
      default:
        updatedPatterns[index] = ''
        updatedPlaceholders[index] = ''
        break
    }

    setPatterns(updatedPatterns)
    setPlaceHolders(updatedPlaceholders)
  }

  const onChangeNumber = (index, e) => {
    setFieldValue(`${name}[${index}].number`, e.target.value)
  }

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {values.phones.map((phone, ix) => (
            <Grid container spacing={2} key={`phones-${ix}`}>
              <Grid item sm={5}>
                <TextField
                  name={`${name}[${ix}].type`}
                  label="Tipo"
                  value={phone.type}
                  onChange={(e) => onChangePhone(ix, e)}
                  select
                  required
                  fullWidth
                >
                  <MenuItem value="">{t('Seleccione...')}</MenuItem>
                  <MenuItem value={TypePhone.movil}>{t('Movil')}</MenuItem>
                  <MenuItem value={TypePhone.land}>{t('Land')}</MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  name={`${name}[${ix}].number`}
                  label="Número"
                  value={phone.number}
                  onChange={(e) => onChangeNumber(ix, e)}
                  type="number"
                  placeholder={placeHolders[ix]}
                  pattern={patterns[ix]}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sm={3}>
                {ix > 0 ? (
                  <Button
                    onClick={() => handleRemovePhone(ix, arrayHelpers)}
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    -
                    <i className="dripicons-trash" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleAddPhone(arrayHelpers)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    +
                    <i className="dripicons-plus" />
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
        </div>
      )}
    />
  )
}

export default Phones
