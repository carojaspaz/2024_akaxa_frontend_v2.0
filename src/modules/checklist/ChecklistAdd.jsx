/** @format */

import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, Typography, Paper, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'

// Services
import { inspectionService } from '../../services/inspectionService'
import { ToasterTypes } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'

// Custom component
import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector'

const ChecklistAdd = () => {
  const { showToaster } = useToaster()
  const [code, setCode] = useState(null) // Use null for better validation
  const [categories, setCategories] = useState([])
  const [rows, setRows] = useState([])
  const [category, setCategory] = useState(null) // Use null for better validation
  const [modal, setModal] = useState(false)

  // Fetch categories based on the selected code
  const activitiesChangeHandler = async (selectedCode) => {
    try {
      const response = await inspectionService.getCategories(JSON.stringify(selectedCode))
      if (response) {
        const { message, categories } = response
        if (message) {
          setCategories([])
          setCategory(null)
          setRows([])
          setModal(false)
          showToaster(message, 'Info', 'info')
        } else {
          let newRows = categories.map((i) => ({
            subject: i.subject,
            sector: i.sector,
            division: i.division,
            subdivision: i.subdivision,
            activity: i.activity,
            activityName: i.activityName,
            evaluationType: i.evaluationType,
            handleDetails: (
              <Button
                type="button"
                onClick={() => {
                  viewCategory(i.id)
                }}>
                <VisibilityIcon />
              </Button>
            ),
          }))
          setCode(selectedCode)
          setCategories(categories)
          setRows(newRows)
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      showToaster('Error al cargar categorías', 'Error', ToasterTypes.Error)
    }
  }

  // Reset form and state
  const resetDataHandler = () => {
    setCode(null) // Use null instead of empty object for better validation
    setCategories([])
    setCategory(null) // Use null instead of empty object
    setRows([])
    setModal(false)
  }

  // Handle form submission
  const handleValidSubmit = async (values) => {
    const body = JSON.stringify(values)
    const response = await inspectionService.postCategory(body)
    if (response) {
      const { message } = response
      if (message) {
        showToaster(message, 'Error', ToasterTypes.Error)
      } else {
        showToaster('Categoría creada satisfactoriamente!', 'Categoría', ToasterTypes.Success)
        activitiesChangeHandler(code)
        resetDataHandler() // Clear form values
      }
    }
  }

  // View category details in modal
  const viewCategory = async (id) => {
    const selectedCategory = categories.find((c) => c.id === id)
    if (selectedCategory) {
      setCategory(selectedCategory)
      toggleModal()
    } else {
      showToaster('Categoria no encontrada', 'Error', ToasterTypes.Error)
    }
  }

  // Toggle modal visibility
  const toggleModal = () => {
    setModal(!modal)
  }

  const data = {
    columns: [
      { label: 'Nombre Categoría', field: 'subject', sort: 'asc' },
      { label: 'Sector Vinculado', field: 'sector', sort: 'asc' },
      { label: 'División', field: 'division', sort: 'asc' },
      { label: 'Subdivisión', field: 'subdivision', sort: 'asc' },
      { label: 'Actividad', field: 'activity', sort: 'asc' },
      { label: 'Nombre', field: 'activityName', sort: 'asc' },
      { label: 'Tipo Evaluación', field: 'evaluationType', sort: 'asc' },
      { label: 'Detalles', field: 'handleDetails', sort: 'asc' },
    ],
    rows,
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Typography variant="h4" gutterBottom>
            Crear Categoría
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <div className="bg-soft-secondary">
                  <Typography variant="h6">Seleccione la actividad económica</Typography>
                  <Grid container spacing={2}>
                    <Grid item sm={8}>
                      <TextField label="Seleccione la actividad" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item sm={4}>
                      <TextField label="Seleccionar código" variant="outlined" fullWidth required />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <TextField label="Seleccione Sector" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField label="Seleccione División" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField label="Seleccione Subdivisión" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item sm={6}>
                      <TextField label="Seleccione Actividad" variant="outlined" fullWidth required />
                    </Grid>
                  </Grid>
                  {/*<BusinessSectorSelector
                    newCode
                    isCategory
                    onChange={activitiesChangeHandler}
                    onReset={resetDataHandler}
                  />*/}
                  <Typography variant="h6">Información de la categoría</Typography>
                  <Grid container spacing={2}>
                    <Grid item sm={8}>
                      <TextField label="Nombre de categoria" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item sm={4}>
                      <TextField label="Riesgo Evaluado" variant="outlined" select fullWidth required SelectProps={{ native: true }}>
                        <option value="vulnerability">Análisis de Vulnerabilidad</option>
                        <option value="efficacy">Análisis de Eficacia</option>
                      </TextField>
                    </Grid>
                    <Grid item sm={12}>
                      <TextField label="Descripción" variant="outlined" fullWidth multiline rows={4} />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid item sm={12}>
                      <TextField label="Tipo de auditoria" variant="outlined" select fullWidth required SelectProps={{ native: true }}>
                        <option >Auditar Empresa</option>
                        <option >Auditar Procesos</option>
                        <option >Auditar Actividades</option>
                        <option >Auditar Maquinaria o Equipo</option>
                      </TextField>
                    </Grid> 
                    <br />
                  <Typography variant="h6">Análisis de Criticidad</Typography>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <TextField label="Condición" variant="outlined" select fullWidth required SelectProps={{ native: true }}>
                        <option>Critico</option>
                        <option>No critico</option>
                      </TextField>
                    </Grid>
                    <Grid item sm={6}>
                      <TextField label="Comportamiento" variant="outlined" select fullWidth required SelectProps={{ native: true }}>
                        <option>Critico</option>
                        <option>No critico</option>
                      </TextField>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Button color="primary" fullWidth variant="contained" onClick={handleValidSubmit}>
                        Crear Categoría
                      </Button>
                    </Grid>
                    <Grid item sm={3}>
                      <Button color="secondary" fullWidth variant="contained" onClick={resetDataHandler}>
                        Limpiar Formulario
                      </Button>
                    </Grid>
                  </Grid>
                </div>
                <hr />
                <Grid container justifyContent="flex-end">
                  <Typography>Total Categorías: {categories.length}</Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Modal open={modal} onClose={toggleModal}>
        <div className="modal-content">
          <Typography variant="h6">{category?.subject}</Typography>
          <Typography>Descripción: {category?.description}</Typography>
          <Typography>Tipo Evaluación: {category?.evaluationType}</Typography>
          <Button color="primary" fullWidth onClick={toggleModal}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default ChecklistAdd
