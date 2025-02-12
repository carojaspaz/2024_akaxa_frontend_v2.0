/** @format */

import React from 'react'
import { TextField, Button, Grid, Container, Typography, Table, TableBody, TableRow, TableCell, TableHead, Card, CardContent, IconButton } from '@mui/material'
import { Edit, Visibility } from '@mui/icons-material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const ProtocolsList = () => {
  // Ejemplo de datos para la tabla
  const tableData = [
    {
      codigo: '001',
      empresa: 'Empresa ABC',
      auditor: 'Auditor 1',
      responsable: 'Responsable 1',
      riesgoInicial: 'Alto',
      riesgoFinal: 'Medio',
    },
    {
      codigo: '002',
      empresa: 'Empresa XYZ',
      auditor: 'Auditor 2',
      responsable: 'Responsable 2',
      riesgoInicial: 'Medio',
      riesgoFinal: 'Bajo',
    },
  ]

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Card>
        <CardContent>
          {/* Sección de búsqueda y botón */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField fullWidth variant="outlined" label="Buscar por Código" size="small" />
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <Button variant="contained" color="primary" size="large">
                Crear Lista de Chequeo
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Listado de Evaluaciones
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Código</b>
                </TableCell>
                <TableCell>
                  <b>Nombre de Empresa</b>
                </TableCell>
                <TableCell>
                  <b>Nombre del Auditor</b>
                </TableCell>
                <TableCell>
                  <b>Responsable del Lugar Evaluado</b>
                </TableCell>
                <TableCell>
                  <b>Riesgo Inicial</b>
                </TableCell>
                <TableCell>
                  <b>Riesgo Final</b>
                </TableCell>
                <TableCell>
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.codigo}</TableCell>
                  <TableCell>{row.empresa}</TableCell>
                  <TableCell>{row.auditor}</TableCell>
                  <TableCell>{row.responsable}</TableCell>
                  <TableCell>{row.riesgoInicial}</TableCell>
                  <TableCell>{row.riesgoFinal}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary">
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton color="default">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ProtocolsList
