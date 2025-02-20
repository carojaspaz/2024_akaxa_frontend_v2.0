/** @format */

import React, { useEffect, useState, useRef } from 'react'
import { Grid, MenuItem, TextField, Button, InputLabel } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { inspectionService } from '../../../services/inspectionService'

const BusinessSectorSelector = ({ name }) => {
  const { setFieldValue, values } = useFormikContext()
  const [sectors, setSectors] = useState([])
  const [divisions, setDivisions] = useState([])
  const [subdivisions, setSubdivisions] = useState([])
  const [activities, setActivities] = useState([])
  const [searchCode, setSearchCode] = useState('')
  const [error, setError] = useState(null)
  const inputRef = useRef()

  const codeCIIU = values[name] || { sector: '', division: '', subdivision: '', activity: '', activityName: '' }

  useEffect(() => {
    const loadSectorsOptions = async () => {
      try {
        const availableSectors = await inspectionService.getCIIU()
        setSectors(availableSectors || [])
      } catch (error) {
        console.error('Error loading sectors:', error)
        setError('Error loading sectors')
      }
    }

    loadSectorsOptions()

    if (codeCIIU.sector) {
      loadDivisionOptions(codeCIIU.sector)
    }
  }, [codeCIIU.sector])

  const loadDivisionOptions = async (sector) => {
    if (!sector) return
    try {
      const availableDivisions = await inspectionService.getDivisions(sector)
      setDivisions(availableDivisions || [])
      setFieldValue(`${name}.division`, '')
      setFieldValue(`${name}.subdivision`, '')
      setFieldValue(`${name}.activity`, '')
    } catch (error) {
      console.error('Error loading divisions:', error)
      setError('Error loading divisions')
    }
  }

  const loadSubdivisionOptions = async (sector, division) => {
    if (!sector || !division) return
    try {
      const availableSubdivisions = await inspectionService.getSubdivisions(sector, division)
      setSubdivisions(availableSubdivisions || [])
      setFieldValue(`${name}.subdivision`, '')
      setFieldValue(`${name}.activity`, '')
    } catch (error) {
      console.error('Error loading subdivisions:', error)
      setError('Error loading subdivisions')
    }
  }

  const loadActivitiesOptions = async (sector, division, subdivision) => {
    if (!sector || !division || !subdivision) return
    try {
      const availableActivities = await inspectionService.getActivities(sector, division, subdivision)
      setActivities(availableActivities || [])
    } catch (error) {
      console.error('Error loading activities:', error)
      setError('Error loading activities')
    }
  }

  const handleSearchCodeChange = (e) => {
    setSearchCode(e.target.value)
  }

  const handleApplyClick = () => {
    const selectedSector = sectors.find((sector) => sector.code === searchCode)
    if (selectedSector) {
      setFieldValue(`${name}.sector`, selectedSector.code)
      loadDivisionOptions(selectedSector.code)
      setFieldValue(`${name}.activityName`, selectedSector.title)
    }
  }

  const onSectorSelected = (e) => {
    const sector = e.target.value
    setFieldValue(`${name}.sector`, sector)
    if (sector !== 'All') {
      loadDivisionOptions(sector)
    } else {
      setFieldValue(`${name}.division`, '')
      setFieldValue(`${name}.subdivision`, '')
      setFieldValue(`${name}.activity`, '')
    }
  }

  const onDivisionSelected = async (e) => {
    const division = e.target.value
    setFieldValue(`${name}.division`, division)
    if (division !== 'All') {
      await loadSubdivisionOptions(codeCIIU.sector, division)
    } else {
      setFieldValue(`${name}.subdivision`, '')
      setFieldValue(`${name}.activity`, '')
    }
  }

  const onSubdivisionSelected = async (e) => {
    const subdivision = e.target.value
    setFieldValue(`${name}.subdivision`, subdivision)
    if (subdivision !== 'All') {
      await loadActivitiesOptions(codeCIIU.sector, codeCIIU.division, subdivision)
    } else {
      setFieldValue(`${name}.activity`, '')
    }
  }

  const onActivitySelected = (e) => {
    const activity = e.target.value
    const selectedActivity = activities.find((act) => act.code === activity)
    setFieldValue(`${name}.activity`, activity)
    if (selectedActivity) {
      setFieldValue(`${name}.activityName`, selectedActivity.title)
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>Actividad Económica</h3>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <div style={{ color: 'red' }}>{error}</div>
        </Grid>
      )}

      <Grid item xs={10}>
        <InputLabel className="mt-2">{`${codeCIIU.activity} ${codeCIIU.activityName}`}</InputLabel>
      </Grid>

      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setFieldValue(`${name}.searchCode`, '')
            setFieldValue(`${name}.sector`, '')
            setFieldValue(`${name}.division`, '')
            setFieldValue(`${name}.subdivision`, '')
            setFieldValue(`${name}.activity`, '')
            setFieldValue(`${name}.activityName`, '')
          }}>
          Nueva Búsqueda
        </Button>
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} select label="Seleccione el Sector" name={`${name}.sector`} value={codeCIIU.sector || ''} onChange={onSectorSelected} required fullWidth>
          <MenuItem value="All">
            <em>Todas</em>
          </MenuItem>
          {sectors.map((sector, index) => (
            <MenuItem key={index} value={sector.code}>
              {sector.title}
            </MenuItem>
          ))}
        </Field>
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} select label="Seleccione División" name={`${name}.division`} value={codeCIIU.division || ''} onChange={onDivisionSelected} required fullWidth>
          <MenuItem value="All">
            <em>Todas</em>
          </MenuItem>
          {divisions.map((division, index) => (
            <MenuItem key={index} value={division.code}>
              {division.title}
            </MenuItem>
          ))}
        </Field>
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} select label="Seleccione Subdivisión" name={`${name}.subdivision`} value={codeCIIU.subdivision || ''} onChange={onSubdivisionSelected} required fullWidth>
          <MenuItem value="All">
            <em>Todas</em>
          </MenuItem>
          {subdivisions.map((subdivision, index) => (
            <MenuItem key={index} value={subdivision.code}>
              {subdivision.title}
            </MenuItem>
          ))}
        </Field>
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} select label="Seleccione Actividad" name={`${name}.activity`} value={codeCIIU.activity || ''} onChange={onActivitySelected} required fullWidth>
          <MenuItem value="All">
            <em>Todas</em>
          </MenuItem>
          {activities.map((activity, index) => (
            <MenuItem key={index} value={activity.code}>
              {activity.title}
            </MenuItem>
          ))}
        </Field>
      </Grid>
    </Grid>
  )
}

export default BusinessSectorSelector
