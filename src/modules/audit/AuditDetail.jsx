/** @format */

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, Table, TableBody, TableRow, TableCell, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { clientService } from '../../services/clientService'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const AuditDetail = () => {
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  const [position, setPosition] = useState({ lat: 1.2131716, lng: -77.285516 })

  useEffect(() => {
    const fetchClientData = async () => {
      const clientData = await clientService.getClientById(id)
      setClient(clientData)
      setLoading(false)
      if (clientData?.address) {
        setPosition({ lat: clientData.address.latitude, lng: clientData.address.longitude })
      }
    }
    fetchClientData()
  }, [id])

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

  if (loading) return <div>Loading...</div>
  if (!client) return <div>Cliente no encontrado</div>

  return (
    <Container>
      <h2>Detalle del Usuario</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Button variant="contained" color="primary" startIcon={<EditIcon />} component={Link} to={`/client/update/${id}`} style={{ marginBottom: '16px' }}>
                Desactivar
              </Button>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" variant="head">Nombre:</TableCell>
                    <TableCell>{client.legalName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" variant="head">Nombre Comercial:</TableCell>
                    <TableCell>{client.businessName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" variant="head">Actividad Comercial:</TableCell>
                    <TableCell>{client.businessActivity}</TableCell>
                  </TableRow>
                  {client.phones?.map((phone, index) => (
                    <TableRow key={`phones-${index}`}>
                      <TableCell component="th" variant="head">{phone.type}:</TableCell>
                      <TableCell>{phone.number}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell component="th" variant="head">Mail:</TableCell>
                    <TableCell>{client.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" variant="head">Contactos</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {client.contacts?.map((contact, index) => (
                    <React.Fragment key={`contacts-${index}`}>
                      <TableRow>
                        <TableCell component="th" variant="head">Nombre:</TableCell>
                        <TableCell>{contact.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" variant="head">Cargo:</TableCell>
                        <TableCell>{contact.position}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" variant="head">Teléfono:</TableCell>
                        <TableCell>{`${contact.phone.type} - ${contact.phone.number}`}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" variant="head">Dirección:</TableCell>
                    <TableCell>{client.address.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" variant="head">Descripción:</TableCell>
                    <TableCell>{client.address.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" variant="head">División Política:</TableCell>
                    <TableCell>{client.address.country}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '250%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker />
                      </MapContainer>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AuditDetail
