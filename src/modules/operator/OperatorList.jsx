/** @format */

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import { operatorService } from '../../services/operatorService'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Grid from '@mui/material/Unstable_Grid2'

import useThemeStore from '../../store/themeStore'
import Button from '@mui/material/Button'
import { Container, Typography } from '@mui/material'

const OperatorList = (props) => {
  const { theme, toggleTheme } = useThemeStore()
  const [operators, setOperators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await operatorService.getOperators()
      if (data) {
        setOperators(data)
        setError(null)
      } else {
        setError('Error fetching operator data')
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  // const [page, setPage] = React.useState(0);

  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <Container fixed maxWidth={'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1>{props.title}</h1>
        </Grid>
        <Grid item xs={4} alignContent={'center'}>
          <Link to="/operators/addOperator">
            <Button variant="contained">Registrar operador</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="center">No Identificación</TableCell>
                  <TableCell align="center">Nombres completos</TableCell>
                  <TableCell align="center">Correo electrónico</TableCell>
                  <TableCell align="center">Tipo Operador</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Ver</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id} item sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {operator.identification.type}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {operator.identification.number}
                    </TableCell>
                    <TableCell align="left">{operator.name}</TableCell>
                    <TableCell align="center">{operator.email}</TableCell>
                    <TableCell align="center">{operator.typeOperator}</TableCell>
                    <TableCell align="center">{operator.approved ? 'Activo' : 'Inactivo'}</TableCell>
                    <TableCell align="center">
                      <Link to={`/operators/operatorDetail/${operator.id}`}>
                        <VisibilityIcon />{' '}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default OperatorList
