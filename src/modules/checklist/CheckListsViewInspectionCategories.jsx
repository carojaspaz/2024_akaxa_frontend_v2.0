/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  Button,
  Container,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// Services
import { inspectionService } from '../../services/inspectionService';

const CheckListsViewInspectionCategories = () => {
  const [code, setCode] = useState({});
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    activitiesChangeHandler({});
  }, []);

  const activitiesChangeHandler = async (code) => {
    const response = await inspectionService.getCategories(JSON.stringify(code));
    if (response) {
      const { message } = response;
      if (message) {
        setCategories([]);
        setRows([]);
        setCategory(null);
        setModalOpen(false);
        alert(message); // Replace this with your toaster if required
      } else {
        const rows = response.map((item) => ({
          id: item.id,
          subject: item.subject,
          activity: item.activity,
          activityName: item.activityName,
          description: item.description,
          evaluationType: item.evaluationType,
          auditType: getAuditType(item.activity),  // Adding the auditType field
        }));
        setCode(code);
        setCategories(response);
        setRows(rows);
      }
    }
  };

  const getAuditType = (activity) => {
    // Example logic to determine the audit type
    switch (activity) {
      case 'empresa':
        return 'Auditar Empresa';
      case 'proceso':
        return 'Auditar Proceso';
      case 'actividad':
        return 'Auditar Actividades';
      case 'maquinaria':
        return 'Auditar Maquinaria o Equipo';
      default:
        return 'No Definido';  // Default case if no match is found
    }
  };

  const handleReset = () => {
    setCode({});
    setCategories([]);
    setRows([]);
    setCategory(null);
    setModalOpen(false);
  };

  const handleViewCategory = (id) => {
    const selectedCategory = categories.find((c) => c.id === id);
    if (selectedCategory) {
      setCategory(selectedCategory);
      setModalOpen(true);
    } else {
      alert('Error: Categoria no encontrada'); // Replace this with your toaster if required
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Categorias
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre Categoría</TableCell>
                    <TableCell>Actividad</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Tipo Evaluación</TableCell>
                    <TableCell>Tipo de Auditoría</TableCell> {/* New column for Audit Type */}
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.activity}</TableCell>
                        <TableCell>{row.activityName}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.evaluationType}</TableCell>
                        <TableCell>{row.auditType}</TableCell> {/* Displaying the audit type */}
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => handleViewCategory(row.id)}
                          >
                            <VisibilityIcon />
                          </Button>
                          <Link to={`/admin/category/edit/${row.id}`}>
                            <Button color="secondary">
                              <EditIcon />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {modalOpen && category && (
        <div>
          <Typography variant="h6">{category.subject}</Typography>
          <Typography>Descripción: {category.description}</Typography>
          <Typography>Tipo Evaluación: {category.evaluationType}</Typography>
          <Typography>Tipo de Auditoría: {category.auditType}</Typography> {/* Showing audit type in modal */}
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </div>
      )}
    </Container>
  );
};

export default CheckListsViewInspectionCategories;
