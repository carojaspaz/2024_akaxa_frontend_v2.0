/** @format */

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import { getAllClients } from '../../services/clientService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import useThemeStore from '../../store/themeStore'
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';


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


const ClientList = (props) => {
  const { theme, toggleTheme } = useThemeStore()
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true);
      const data = await getAllClients();
      console.log(JSON.stringify(data))
      if(data){
        setClients (data);
        setError(null)
      }else{
        setError('Error fetching client data')
      }
      setLoading(false)
    }
    fetchData();
  },[]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;




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
        <Grid item xs={8}><h1>{props.title}</h1></Grid>
        <Grid item xs={4} alignContent={'center'}>
          <Link to="/clients/addClient">
          <Button  variant='contained'> Registrar usuario</Button>
          </Link>
          </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID </TableCell>
                  <TableCell align="center">Nombre legal</TableCell>
                  <TableCell align="center">Actividad</TableCell>
                  <TableCell align="center">Correo electrónico</TableCell>
                  <TableCell align="center">Total Empleados</TableCell> 
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Opcion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    // hover 
                    // role="checkbox" 
                    // tabIndex={-1}
                    key={client.id}
                    item
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {client.identification.number}
                    </TableCell>
                    <TableCell align="left">{client.legalName}</TableCell>
                    <TableCell align="justify">{client.businessActivity}</TableCell>
                    <TableCell align="center">{client.email}</TableCell>
                    <TableCell align="center">{client.totalEmployees}</TableCell>
                    <TableCell align="center">{client.isActive?'Activo':'Inactivo'}</TableCell>
                    <TableCell align='center'>
                      <Link to="/clients/clientDetail"><VisibilityIcon/> </Link> 
                      <Link href="#"><EditIcon/> </Link>
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

export default ClientList
