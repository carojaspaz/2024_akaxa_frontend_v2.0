/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Typography, Table } from '@mui/material'
//import ShowAddress from '../../components/Common/ShowAddress';
//import { ToasterTypes } from '../../helpers/config/constants';
//import toaster from '../../helpers/common/toaster';

// Datos mockeados
const mockClientData = {
  legalName: 'Empresa Mock',
  businessName: 'Mock Comercial',
  businessActivity: 'Tecnología',
  phones: [
    { type: 'Teléfono', number: '123-456-7890' },
    { type: 'Móvil', number: '098-765-4321' },
  ],
  email: 'contacto@empresamock.com',
  operator: 'Operador Mock',
  contacts: [
    { name: 'Juan Pérez', position: 'Gerente', phone: { type: 'Teléfono', number: '123-456-7890' } },
    { name: 'Ana Gómez', position: 'Asistente', phone: { type: 'Móvil', number: '098-765-4321' } },
  ],
  address: {
    street: 'Av. Mock 123',
    city: 'Mock City',
    country: 'Mock Country',
  },
}

const OperatorDetail = () => {
  const [client, setClient] = useState(mockClientData)

  useEffect(() => {
    setTimeout(() => {
      //setShowAddress(true);
    }, 1000)
  }, [])

  return (
    <Container>
      <h2>Detalle del Usuario</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Link to="/client/update/" className="btn btn-primary">
                  Editar
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
                  {client.phones.map((phone, index) => (
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
                    <th>Operador:</th>
                    <td>{client.operator}</td>
                  </tr>
                  <tr>
                    <th>Contactos:</th>
                    <td></td>
                  </tr>
                  {client.contacts.map((contact, index) => (
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
        {/* 
        <Grid item xs={12} md={8}>
          {showAddress ? (
            <ShowAddress address={client.address} />
          ) : (
            <div className="spinner-grow text-success text-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Grid>
        */}
      </Grid>
    </Container>
  )
}

export default OperatorDetail
