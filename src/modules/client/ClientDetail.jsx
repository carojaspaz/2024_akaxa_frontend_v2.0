/** @format */

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, Table } from '@mui/material'
import { clientService } from '../../services/clientService'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const ClientDetail = () => {
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
              <Typography variant="h5" component="h2">
                <Link to={`/client/update/${id}`} className="btn btn-primary">
                  Desactivar
                </Link>
              </Typography>
              <Table>
                <tbody>
                  <tr>
                    <th>Nombre:</th>
                    <td>{client.legalName}</td>
                  </tr>
                  <tr>
                    <th>Nombre Comercial:</th>
                    <td>{client.businessName}</td>
                  </tr>
                  <tr>
                    <th>Actividad Comercial:</th>
                    <td>{client.businessActivity}</td>
                  </tr>
                  {client.phones &&
                    client.phones.map((phone, index) => (
                      <tr key={`phones-${index}`}>
                        <th>{phone.type}:</th>
                        <td>{phone.number}</td>
                      </tr>
                    ))}
                  <tr>
                    <th>Mail:</th>
                    <td>{client.email}</td>
                  </tr>
                  <tr>
                    <th>Contactos</th>
                    <td></td>
                  </tr>
                  {client.contacts &&
                    client.contacts.map((contact, index) => (
                      <React.Fragment key={`contacts-${index}`}>
                        <tr>
                          <th>Nombre:</th>
                          <td>{contact.name}</td>
                        </tr>
                        <tr>
                          <th>Cargo:</th>
                          <td>{contact.position}</td>
                        </tr>
                        <tr>
                          <th>Teléfono:</th>
                          <td>{`${contact.phone.type} - ${contact.phone.number}`}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Table>
                <tbody>
                  <tr>
                    <th>Dirección:</th>
                    <td>{client.address.address}</td>
                  </tr>
                  <tr>
                    <th>Descpripción:</th>
                    <td>{client.address.description}</td>
                  </tr>
                  <tr>
                    <th>División Política:</th>
                    <td>{client.address.country}</td>
                  </tr>
                  <tr>
                    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '250%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationMarker />
                    </MapContainer>
                  </tr>
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ClientDetail
