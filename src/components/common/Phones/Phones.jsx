/** @format */
import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'

// Helpers
import { ToasterTypes, Patterns, TypePhone } from '../../../helpers/config/constants'
import useToaster from '../../../helpers/common/toaster'

const Phones = ({ max = 4, phones: initialPhones = [] }) => {
  const { showToaster } = useToaster()
  const { t } = useTranslation()

  const [phones, setPhones] = useState([{ type: '', number: '' }])
  const [patterns, setPatterns] = useState([''])
  const [placeHolders, setPlaceHolders] = useState([''])

  useEffect(() => {
    if (initialPhones.length) {
      setPhones(initialPhones)
    }
  }, [initialPhones])

  const handleAddPhone = () => {
    if (phones.length < max) {
      setPhones([...phones, { type: '', number: '' }])
      setPatterns([...patterns, ''])
      setPlaceHolders([...placeHolders, ''])
    } else {
      showToaster(`${max} ${t('Teléfonos máximo')}`, 'Teléfonos', ToasterTypes.Info)
    }
  }

  const handleRemovePhone = (index) => {
    if (phones.length > 1) {
      const updatedPhones = phones.filter((_, i) => i !== index)
      const updatedPatterns = patterns.filter((_, i) => i !== index)
      const updatedPlaceholders = placeHolders.filter((_, i) => i !== index)

      setPhones(updatedPhones)
      setPatterns(updatedPatterns)
      setPlaceHolders(updatedPlaceholders)
    }
  }

  const onChangePhone = (index, e) => {
    const updatedPhones = [...phones]
    updatedPhones[index].type = e.target.value

    const updatedPatterns = [...patterns]
    const updatedPlaceholders = [...placeHolders]
    switch (e.target.value) {
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

    setPhones(updatedPhones)
    setPatterns(updatedPatterns)
    setPlaceHolders(updatedPlaceholders)
  }

  const onChangeNumber = (index, e) => {
    const updatedPhones = [...phones]
    updatedPhones[index].number = e.target.value
    setPhones(updatedPhones)
  }

  return (
    <div>
      {phones.map((phone, ix) => (
        <Grid container spacing={2} key={`phones-${ix}`}>
          <Grid item sm={5}>
            <TextField name={`phones[${ix}].type`} label="Tipo" value={phone.type} onChange={(e) => onChangePhone(ix, e)} select required fullWidth>
              <MenuItem value="">{t('Seleccione...')}</MenuItem>
              <MenuItem value={TypePhone.movil}>{t('Movil')}</MenuItem>
              <MenuItem value={TypePhone.land}>{t('Land')}</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={4}>
            <TextField name={`phones[${ix}].number`} label="Número" value={phone.number} onChange={(e) => onChangeNumber(ix, e)} type="number" placeholder={placeHolders[ix]} pattern={patterns[ix]} required fullWidth />
          </Grid>
          <Grid item sm={3}>
            {ix > 0 ? (
              <Button onClick={() => handleRemovePhone(ix)} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                -
                <i className="dripicons-trash" />
              </Button>
            ) : (
              <Button onClick={handleAddPhone} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                +
                <i className="dripicons-plus" />
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default Phones
