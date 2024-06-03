/** @format */

import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import useThemeStore from '../../store/themeStore'
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),

];


const ClientList = () => {
  const { theme, toggleTheme } = useThemeStore()

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
        <Grid item xs={8}><h1>Lista de Clientes</h1></Grid>
        <Grid item xs={4} alignContent={'center'}><Button variant='contained'> Registrar usuario</Button></Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="right">Nombre legal</TableCell>
                  <TableCell align="right">Actividad</TableCell>
                  <TableCell align="right">Correo electrónico</TableCell>
                  <TableCell align="right">Estado</TableCell>
                  <TableCell align="right">Sucursales</TableCell>
                  <TableCell align="right">Opcion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    // hover 
                    // role="checkbox" 
                    // tabIndex={-1}
                    key={row.name}
                    item
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
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

export default ClientList
