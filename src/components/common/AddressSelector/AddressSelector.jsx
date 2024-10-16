/** @format */

import React, { useState } from 'react'
import { TextField, Grid, MenuItem, Container } from '@mui/material'
import { Field } from 'formik'
import { commonService } from '../../../services/commonService'

const AddressSelector = ({ countries }) => {
  const [departments, setDepartments] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [centers, setCenters] = useState([])

  const handleCountryChange = async (event) => {
    const countryValue = event.target.value
    if (countryValue !== '') {
      const response = await commonService.getStateCountry(countryValue)
      setDepartments(response)
    }
  }

  const handleDepartmentChange = async (event) => {
    const departmentValue = event.target.value
    if (departmentValue !== '') {
      const response = await commonService.getMunicipalityStates(departmentValue)
      setMunicipalities(response)
    }
  }

  const handleMunicipalityChange = async (event) => {
    const municipalityValue = event.target.value
    if (municipalityValue !== '') {
      const response = await commonService.getPopulateCenterMunicipality(municipalityValue)
      setCenters(response)
    }
  }

  

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <h3>Ubicación Geográfica</h3>
        </Grid>
        <Grid item xs={3}>
          <Field as={TextField} select label="País" name="address.country" fullWidth onChange={(event) => handleCountryChange(event)}>
            <MenuItem value="">
              <em>Seleccione...</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={3}>
          <Field as={TextField} select label="Departamento" name="address.firstPoliticalDivision" fullWidth onChange={(event) => handleDepartmentChange(event)}>
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
          <Field as={TextField} select label="Municipio" name="address.secondPoliticalDivision" fullWidth onChange={(event) => handleMunicipalityChange(event)}>
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
          <Field as={TextField} select label="Centro" name="address.thirdPoliticalDivision" fullWidth>
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

        <Grid item xs={12}>
          <Field as={TextField} label="latitude" hidden name="address.latitude" value="1.2131716" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Field as={TextField} label="longitude" hidden name="address.longitude" value="-77.285516" fullWidth />
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddressSelector
