/** @format */
import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, MenuItem, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ToasterTypes } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

import { inspectionService } from '../../services/inspectionService'

import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector'


const ChecklistAdd = () => {
  const { t } = useTranslation()
  const { showToaster } = useToaster()
  const [code, setCode] = useState({})
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [rows, setRows] = useState([])
  const [modal, setModal] = useState(false)
  const [newCode, setNewCode] = useState("");
  const [isCategory, setIsCategory] = useState(false);

  const data = {
    columns: [
      { label: 'Nombre Categoría', field: 'subject', sort: 'asc' },
      { label: 'Sector Vinculado', field: 'sector', sort: 'asc' },
      { label: 'División', field: 'division', sort: 'asc' },
      { label: 'Subdivisión', field: 'subdivision', sort: 'asc' },
      { label: 'Actividad', field: 'activity', sort: 'asc' },
      { label: 'Nombre', field: 'activityName', sort: 'asc' },
      { label: 'Tipo Evaluación', field: 'evaluationType', sort: 'asc' },
      { label: 'Tipo de Auditoria', field: 'auditType', sort: 'asc' },
      { label: 'Detalles', field: 'handleDetails', sort: 'asc' },
    ],
    rows: rows,
  }

  const activitiesChangeHandler = async (code) => {
    const categories = await inspectionService.getCategories(JSON.stringify(code))
    if (categories) {
      const { message } = categories
      if (message) {
        setCategories([])
        setCategory({})
        setRows([])
        setModal(false)
        showToaster(message, 'Info', ToasterTypes.Info)
      } else {
        const rows = categories.map((i) => ({
          subject: i.subject,
          sector: i.sector,
          division: i.division,
          subdivision: i.subdivision,
          activity: i.activity,
          activityName: i.activityName,
          evaluationType: i.evaluationType,
          description: i.description,
          auditType: i.auditType,
          handleDetails: (
            <Button
              type="button"
              onClick={() => viewCategory(i.id)}
            >
              <i className="mdi mdi-card-account-details mr-1"></i>
            </Button>
          ),
        }))
        setCode(code)
        setCategories(categories)
        setRows(rows)
      }
    }
  }

  const resetDataHandler = () => {
    setCode({})
    setCategories([])
    setCategory({})
    setRows([])
  }

  const handleValidSubmit = async (values, { resetForm }) => {
    try {
      const response = await inspectionService.postCategory(values); 
  
      if (response?.message) {
        showToaster('Error', response.message, ToasterTypes.Error);
      } else {
        showToaster('Categoría', 'Categoría creada satisfactoriamente!', ToasterTypes.Success);
        activitiesChangeHandler(code);
        resetForm();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.response?.data || error.message);
      showToaster('Error', error.response?.data?.message || "Ocurrió un error inesperado", ToasterTypes.Error);
    }
  };
  
  const viewCategory = (id) => {
    const response = categories.find((c) => c.id === id)
    if (response) {
      setCategory(response)
      toggleModal()
    } else {
      showToaster('Error', 'Categoría no encontrada', ToasterTypes.Error)
    }
  }

  const toggleModal = () => {
    setModal((prevModal) => !prevModal)
  }

  return (
    <Container fluid="true">
      <br/>
       <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
      <Grid>
        <Typography variant="h4">Registrar Categoría</Typography>
      </Grid>
      <Grid>
        <Link to="/CheckListsAddItems">
          <Button variant="contained">Registrar Item</Button>
        </Link>
      </Grid >
    </Grid>
    <br/>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              subject: '',
              evaluationType: '',
              auditType: '',
            }}
            onSubmit={handleValidSubmit}
          >
            {({ handleSubmit, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                <BusinessSectorSelector
                  newCode={newCode || ""}
                  isCategory={isCategory}
                  onChange={activitiesChangeHandler}
                  onReset={resetDataHandler}
                />


                <h3>{t('Información de la categoría')}</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field as={TextField} fullWidth name="subject" label={t('Nombre de la Categoría')} required />
                    <ErrorMessage name="subject" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field as={TextField} select fullWidth name="evaluationType" label={t('Riesgo Evaluado')} required>
                      <MenuItem value="">{t('Selecciona')}</MenuItem>
                      <MenuItem value="vulnerability">{t('Vulnerabilidad')}</MenuItem>
                      <MenuItem value="efficacy">{t('Eficacia')}</MenuItem>
                    </Field>
                    <ErrorMessage name="evaluationType" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field as={TextField} select fullWidth name="auditType" label={t('Tipo de Auditoría')} required>
                      <MenuItem value="">{t('Selecciona')}</MenuItem>
                      <MenuItem value="company">{t('Empresa')}</MenuItem>
                      <MenuItem value="process">{t('Proceso')}</MenuItem>
                      <MenuItem value="place">{t('Lugar')}</MenuItem>
                      <MenuItem value="activities">{t('Actividades')}</MenuItem>
                      <MenuItem value="machinery">{t('Maquinaria')}</MenuItem>
                    </Field>
                    <ErrorMessage name="auditType" component="div" />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Field as={TextField} fullWidth multiline rows={3} name="Description" label={t('Descripción')} />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid item sm={3}>
                    <Button type="submit" variant="contained" color="primary">
                      {t('Crear Categoria')}
                    </Button>
                  </Grid>
                  <Grid item sm={3} sx={{ marginLeft: 'auto' }}>
                    <Button type="button" variant="contained" color="secondary" onClick={() => resetForm()}>
                      {t('Limpiar Formualrio')}
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {data.columns.map((col) => (
                          <TableCell key={col.field}>{col.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.rows.map((row, index) => (
                        <TableRow key={index}>
                          {data.columns.map((col) => (
                            <TableCell key={col.field}>{row[col.field]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>

      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader className="bg-primary" toggle={toggleModal}>
          {category.subject}
        </ModalHeader>
        <ModalBody>
          <p>{`Descripción: ${category.description || ''}`}</p>
          <p>{`Tipo Evaluación: ${t(category.evaluationType || '')}`}</p>
        </ModalBody>
      </Modal>
    </Container>
  )
}

export default ChecklistAdd
