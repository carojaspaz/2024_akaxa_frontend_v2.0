/** @format */

import React, { useState } from 'react'
import { TextField, Grid, MenuItem, Container } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { commonService } from '../../../services/commonService'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
//import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const AddressSelector = ({ countriesOptions }) => {
  const { setFieldValue } = useFormikContext()
  const [departments, setDepartments] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [centers, setCenters] = useState([])
  const [position, setPosition] = useState({ lat: 1.2131716, lng: -77.285516 })

  // Coordenadas iniciales del mapa
  //const [center, setCenter] = useState({ lat: 1.2131716, lng: -77.285516 })

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

  /*const handleMarkerDragEnd = (event) => {
    const lat = event.latLng?.lat()
    const lng = event.latLng?.lng()
    if (lat && lng) {
      setCenter({ lat, lng })
      setFieldValue('address.latitude', lat)
      setFieldValue('address.longitude', lng)
    }
  }*/

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng)
        setFieldValue('address.latitude', e.latlng.lat)
        setFieldValue('address.longitude', e.latlng.lng)
      },
    })

    return position === null ? null : (
      <Marker
        position={position}
        draggable
        icon={markerIcon}
        eventHandlers={{
          dragend: (e) => {
            const latLng = e.target.getLatLng()
            setPosition(latLng)
            setFieldValue('address.latitude', latLng.lat)
            setFieldValue('address.longitude', latLng.lng)
          },
        }}
      />
    )
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

      <Grid item xs={12}>
        <h6>Ubique el marcador sobre la dirección deseada dentro del mapa. El sistema automáticamente detectará las coordenadas (Latitud y Longitud).</h6>
      </Grid>

      <Grid item xs={12}>
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </Grid>

      {/* Campos de latitud y longitud */}
      <Grid item xs={6}>
        <Field as={TextField} label="Latitud" name="address.latitude" value={position.lat} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Field as={TextField} label="Longitud" name="address.longitude" value={position.lng} fullWidth />
      </Grid>

      {/*<Grid item xs={12} style={{ height: '400px' }}>
        <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
          <Map defaultCenter={center} defaultZoom={15} gestureHandling={'greedy'} style={{ height: '100%' }}>
            <Marker position={center} draggable onDragEnd={handleMarkerDragEnd} />
          </Map>
        </APIProvider>
      </Grid>

      <Grid item xs={6}>
        <Field as={TextField} label="Latitud" name="address.latitude" value={center.lat} fullWidth disabled />
      </Grid>
      <Grid item xs={6}>
        <Field as={TextField} label="Longitud" name="address.longitude" value={center.lng} fullWidth disabled />
      </Grid>*/}
    </Grid>
  )
}

export default AddressSelector
