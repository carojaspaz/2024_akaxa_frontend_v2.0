/** @format */

import React, { useState } from 'react'
import { TextField, Grid, MenuItem, Container } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { commonService } from '../../../services/commonService'

const AddressSelector = ({ countriesOptions }) => {
  const { setFieldValue } = useFormikContext()
  const [departments, setDepartments] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [centers, setCenters] = useState([])

  const handleCountryChange = async (event) => {
    const countryValue = event.target.value
    if (countryValue !== '') {
      const response = await commonService.getStateCountry(countryValue)
      setDepartments(response)
      setFieldValue('address.country', countryValue)
      setFieldValue('address.firstPoliticalDivision', '')
      setFieldValue('address.secondPoliticalDivision', '')
      setMunicipalities([])
      setCenters([])
    }
  }

  const handleDepartmentChange = async (event) => {
    const departmentValue = event.target.value
    if (departmentValue !== '') {
      const response = await commonService.getMunicipalityStates(departmentValue)
      setMunicipalities(response)
      setFieldValue('address.firstPoliticalDivision', departmentValue)
      setFieldValue('address.secondPoliticalDivision', '')
      setCenters([])
    }
  }

  const handleMunicipalityChange = async (event) => {
    const municipalityValue = event.target.value
    if (municipalityValue !== '') {
      const response = await commonService.getPopulateCenterMunicipality(municipalityValue)
      setCenters(response)
      setFieldValue('address.secondPoliticalDivision', municipalityValue)
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>Ubicación Geográfica</h3>
      </Grid>
      <Grid item xs={3}>
        <Field as={TextField} select label="País" name="address.country" fullWidth onChange={handleCountryChange} required>
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          {countriesOptions.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </Field>
      </Grid>
      <Grid item xs={3}>
        <Field as={TextField} select label="Departamento" name="address.firstPoliticalDivision" fullWidth onChange={handleDepartmentChange} required>
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          {departments.map((department) => (
            <MenuItem key={department.code} value={department.code}>
              {department.name}
            </MenuItem>
          ))}
        </Field>
      </Grid>
      <Grid item xs={3}>
        <Field as={TextField} select label="Municipio" name="address.secondPoliticalDivision" fullWidth onChange={handleMunicipalityChange} required>
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          {municipalities.map((municipality) => (
            <MenuItem key={municipality.code} value={municipality.code}>
              {municipality.name}
            </MenuItem>
          ))}
        </Field>
      </Grid>
      <Grid item xs={3}>
        <Field as={TextField} select label="Centro" name="address.thirdPoliticalDivision" fullWidth required>
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          {centers.map((center) => (
            <MenuItem key={center.code} value={center.code}>
              {center.name}
            </MenuItem>
          ))}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <Field as={TextField} label="Dirección" name="address.address" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Field as={TextField} label="Descripción geográfica" name="address.description" fullWidth />
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} label="Latitud" hidden name="address.latitude" value="1.2131716" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Field as={TextField} label="Longitud" hidden name="address.longitude" value="-77.285516" fullWidth />
      </Grid>
    </Grid>
  )
}

export default AddressSelector
