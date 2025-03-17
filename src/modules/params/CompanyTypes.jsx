import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, Container, Card, CardContent, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ToasterTypes } from '../../helpers/config/constants';
import useToaster from '../../helpers/common/toaster';
import { commonService } from '../../services/commonService';

const CompanyTypes = () => {
  const { t } = useTranslation();
  const [riskTypes, setRiskTypes] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [mockData, setMockData] = useState([]);
  const formRef = useRef();

  const { showToaster } = useToaster();

  useEffect(() => {
    loadRiskTypes();
  }, []);

  const loadRiskTypes = async () => {
    const response = await commonService.getRiskTypes();
    if (response && response.message) {
      showToaster('Error', response.message, ToasterTypes.Error);
    } else {
      setRiskTypes(response || []);
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);

    switch (type) {
      case 'empresa':
        setMockData([{ id: 1, name: 'Empresa A' }, { id: 2, name: 'Empresa B' }]);
        break;
      case 'proceso':
        setMockData([{ id: 1, name: 'Proceso 1' }, { id: 2, name: 'Proceso 2' }]);
        break;
      case 'actividad':
        setMockData([{ id: 1, name: 'Actividad X' }, { id: 2, name: 'Actividad Y' }]);
        break;
      case 'maquinaria':
        setMockData([{ id: 1, name: 'Máquina Alfa' }, { id: 2, name: 'Equipo Beta' }]);
        break;
      default:
        setMockData([]);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, type: selectedType, ...values },
    ]);
    resetForm();
  };

  const handleEdit = (id) => {
    const rowToEdit = rows.find((row) => row.id === id);
    if (rowToEdit) {
      formRef.current.setValues(rowToEdit);
    }
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    showToaster('Success', t('Row deleted successfully'), ToasterTypes.Success);
  };

  const validationSchema = Yup.object({
    type: Yup.string().required(t('Field is required')),
    riskLevel: Yup.string().required(t('Field is required')),
    desc: Yup.string(),
  });

  const columns = [
    { field: 'type', headerName: t('Tipo'), flex: 1 },
    { field: 'desc', headerName: t('Descripción'), flex: 1 },
    { field: 'riskLevel', headerName: t('Nivel de Riesgo'), flex: 1 },
    {
      field: 'actions',
      headerName: t('Acciones'),
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            {t('Editar')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            {t('Eliminar')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid item sm={12}>
            <TextField
              label="Tipo de formulario"
              variant="outlined"
              select
              fullWidth
              value={selectedType}
              onChange={handleTypeChange}
            >
              <MenuItem value="empresa">Tipo de Empresa</MenuItem>
              <MenuItem value="proceso">Tipo de Procesos</MenuItem>
              <MenuItem value="actividad">Tipo de Actividades</MenuItem>
              <MenuItem value="maquinaria">Tipo de Maquinaria o Equipo</MenuItem>
            </TextField>
          </Grid>

          {selectedType && (
            <Formik
              innerRef={formRef}
              initialValues={{ type: '', riskLevel: '', desc: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={12}>
                      <h2>{t(`Formulario para ${selectedType}`)}</h2>
                      <hr />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="type"
                        as={TextField}
                        label={t('Tipo')}
                        select
                        fullWidth
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="type" />}
                      >
                        <MenuItem value="">{t('Seleccione...')}</MenuItem>
                        {mockData.map((item) => (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="riskLevel"
                        as={TextField}
                        label={t('Nivel de Riesgo')}
                        select
                        fullWidth
                        value={values.riskLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={<ErrorMessage name="riskLevel" />}
                      >
                        <MenuItem value="">{t('Seleccione...')}</MenuItem>
                        {riskTypes.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.risk}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="desc"
                        as={TextField}
                        label={t('Descripción')}
                        fullWidth
                        multiline
                        rows={4}
                        value={values.desc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        {t('Agregar')}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}

          <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} disableSelectionOnClick />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CompanyTypes;
