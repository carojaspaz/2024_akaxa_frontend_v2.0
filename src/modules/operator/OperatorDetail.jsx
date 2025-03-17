/** @format */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Card, CardContent, Table, TableBody, TableRow, TableCell, Typography, Avatar } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import { operatorService } from '../../services/operatorService'

const OperatorDetail = () => {
  const { operatorId } = useParams()
  const [operator, setOperator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { authState } = useAuth()

  useEffect(() => {
    const fetchOperatorDetail = async () => {
      try {
        const data = await operatorService.getOperatorId(operatorId)
        setOperator(data)
      } catch (err) {
        setError('Error fetching operator details')
      } finally {
        setLoading(false)
      }
    }

    fetchOperatorDetail()
  }, [operatorId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalle del Operador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ backgroundColor: 'rgb(227, 242, 253)' }}>
              <Typography variant="h5" gutterBottom>
                {`${operator.firstName} ${operator.lastName}`}
              </Typography>
              <br/>
              <Grid container spacing={2}>
                <Grid item sm={2} textAlign="center">
                  <Avatar src={operator.profilePicture} alt="Profile" sx={{ width: 80, height: 80, marginBottom: 2 }} />
                  {authState.role === 'Operator' || authState.role === 'Admin' ? (
                    <Button onClick={this.toggleApprove} color="primary"component="th" variant="head" fullWidth>
                      {operator.approved ? 'No Aprobar' : 'Aprobar'}
                    </Button>
                  ) : (
                    <Typography>{operator.approved ? 'Aprobado' : 'No Aprobado'}</Typography>
                  )}
                </Grid>

                <Grid item sm={5}>
                  <Typography variant="h6" gutterBottom>
                    {'Información Operador'}
                  </Typography>
                  <Table>
                    <TableBody>
                      {operator.typeOperator === 'Legal' && (
                        <TableRow>
                          <TableCell component="th" variant="head">{'Nombre Comercial'}:</TableCell>
                          <TableCell>{`${operator.legalName} | ${operator.businessName}`}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell component="th" variant="head">{'Nombre'}:</TableCell>
                        <TableCell>{`${operator.firstName} ${operator.lastName}`}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" variant="head">Correo Electronico:</TableCell>
                        <TableCell>{operator.email}</TableCell>
                      </TableRow>
                      {operator.phones.map((item, ix) => (
                        <TableRow key={`phone-${ix}`}>
                          <TableCell component="th" variant="head">{item.type}:</TableCell>
                          <TableCell>{item.number}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell component="th" variant="head">Roles:</TableCell>
                        <TableCell>
                          {operator.profileType.audit ? 'Auditor ' : ''}
                          {operator.profileType.consultancy ? 'Consultor ' : ''}
                          {operator.profileType.teaching ? 'Instructor ' : ''}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>

                <Grid item sm={5}>
                  <Typography variant="h6" gutterBottom>
                    {'Resumen'}
                  </Typography>
                  <Typography>{operator.abstract}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default OperatorDetail
