/** @format */
import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, Container } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik'

const countries = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'MEX', label: 'Mexico' },
    // Add more countries as needed
];

const ClientAdd = () => {
    const [formData, setFormData] = useState({
        comercialName: '',
        dni: '',
        dateOfBirth: null,
        country: '',
        city: '',
        municipality: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <Container>
            <Formik initialValues={{ legalName: '', comercialName: '' }} >
                <form>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <h1>Registrar nuevo cliente</h1>
                            <hr />
                            <h3>Datos Generales</h3>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Nombre legal"
                                name="legalName"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Nombre comercial"
                                name="comercialName"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Correo electrónico"
                                name="emailClient"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Tipo documento"
                                name="DNI"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                                <MenuItem>Cédula de ciudadanía</MenuItem>
                                <MenuItem>NIT</MenuItem>
                                <MenuItem>Cédula de Extranjería</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Número de documento"
                                name="DNI"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="Tipo de empresa"
                                name="factoryType"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                                <MenuItem>Interna</MenuItem>
                                <MenuItem>Externa</MenuItem>
                                <MenuItem>Otra</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Button>Agregar área</Button>
                            <TextField
                                select
                                label="Áreas"
                                name="areas"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                                <MenuItem>Interna</MenuItem>
                                <MenuItem>Externa</MenuItem>
                                <MenuItem>Otra</MenuItem>
                            </TextField>

                        </Grid>
                        {/* Datos de contacto */}
                        <Grid item xs={12}>
                            <h3>Datos de Contacto</h3>
                            <hr />
                        </Grid>

                        {/* Actividad económica */}
                        <Grid item xs={12}>
                            <h3>Actividad económica</h3>
                            <hr />
                        </Grid>

                        {/* Actividad económica */}
                        <Grid item xs={12}>
                            <h3>Ubicación geográfica</h3>
                            <hr />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="País"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Departamento"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Municipio"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Centro poblado"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Dirección"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción geográfica"
                                name="country"
                                fullWidth
                            >
                                <MenuItem>Seleccione...</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Registrar Cliente
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Formik>
        </Container>
    );
};

export default ClientAdd