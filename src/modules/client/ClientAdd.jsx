/** @format */
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, MenuItem, Container } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//
import { Row, Col, Card, CardBody, CardTitle, Label, FormGroup, Modal, ModalHeader, ModalBody } 
from 'reactstrap';
import { ToasterTypes, ParamTypes, Patterns } from '../../helpers/config/constants';
//import toaster from '../../helpers/common/toaster';
import { useTranslation } from 'react-i18next';

// Import Breadcrumb
//import Breadcrumbs from '../../components/Common/Breadcrumb';

// Custom components
//import BusinessSectorSelector from '../../components/Common/BusinessSectorSelector';
//import AddresSelector from '../../components/Common/AddresSelector';
//import ContactClient from '../../components/Common/ContactClient';
//import Phones from '../../components/Common/Phones';

// Services
//import { clientService } from '../../services/clientService';
//import { commonService } from '../../services/commonService';
//

const countries = [
    { value: 'USA', label: 'United States' },
    { value: 'CAN', label: 'Canada' },
    { value: 'MEX', label: 'Mexico' },    
];

const ClientAdd = () => {

    //-----------------------------------------------------------

    const [modal, setModal] = useState(false);
    const [docTypes, setDocTypes] = useState([]);
    const [activities, setActivities] = useState([]);
    const [activityOptions, setActivityOptions] = useState([]);
    const [activityValues, setActivityValues] = useState([]);
    const [enterpriseTypes, setEnterpriseTypes] = useState([]);
    const { t } = useTranslation();
    const formRef = useRef(null);
    
    useEffect(() => {
        loadDocTypes();
        loadActivitiesVerify();
        loadCompanyTypes();
    }, []);
    
    const toggleModal = () => {
        setModal((prevState) => !prevState);
    };
    
    const loadDocTypes = async () => {
        //const response = await commonService.getParameters(ParamTypes.documentTypes);
        const response = null; // crear mock de docTypes
        if (response) {
        const { message } = response;
        if (message) {
            toaster.ShowToaster('Error', message, ToasterTypes.Error);
        } else {
            setDocTypes(response);
        }
        }
    };

    const loadActivitiesVerify = async () => {
        //const response = await commonService.getActivitiesVerify();
        const response = null; // crear mock
        if (response) {
        const { message } = response;
        if (message) {
            toaster.ShowToaster('Error', message, ToasterTypes.Error);
        } else {
            setActivityOptions(response);
        }
        }
    };
    
    const loadCompanyTypes = async () => {
        //const response = await commonService.getCompanyType();
        const response = null; // crear mock
        if (response) {
        const { message } = response;
        if (message) {
            toaster.ShowToaster('Error', message, ToasterTypes.Error);
        } else {
            setEnterpriseTypes(response);
        }
        }
    };
    
    const onChangeActivity = (selectedOptions) => {
        if (selectedOptions) {
        const todo = selectedOptions.find((i) => i.value === 'TODO');
        if (todo) {
            const newActivities = [{ type: 'TODO', isSelected: true }];
            setActivityValues([{ value: todo.value, label: todo.label }]);
            setActivities(newActivities);
        } else {
            const newActivities = selectedOptions.map((i) => ({
            type: i.value,
            isSelected: true,
            }));
            const newActivityValues = selectedOptions.map((i) => ({
            value: i.value,
            label: i.label,
            }));
            setActivityValues(newActivityValues);
            setActivities(newActivities);
        }
        } else {
        setActivityValues([]);
        setActivities([]);
        }
    };
    
    const handleActivity = async (event, values) => {
        const body = JSON.stringify(values);
        const response = await commonService.postActivityVerify(body);
        if (response) {
        loadActivitiesVerify();
        toggleModal();
        }
    };
    
    const handleValidSubmit = async (event, values) => {
        if (activities.length > 0) {
        values.activities = activities;
        const body = JSON.stringify(values);
        //const response = await clientService.postClient(body);
        const response = null;
        const { message } = response;
        if (message) {
            toaster.ShowToaster('Error', message, ToasterTypes.Error);
        } else {
            toaster.ShowToaster(t('Create Client Success'), t('Create Client'), ToasterTypes.Success);
            const profile = {
            firstName: values.legalName,
            lastName: values.businessName,
            identification: values.identification,
            phones: values.phones,
            email: values.email,
            };
            clientService.postProfileClient(response, JSON.stringify(profile));
            formRef.current.reset();
        }
        } else {
        toaster.ShowToaster('Error', 'Debe escoger al menos una actividad.', ToasterTypes.Error);
        }
    };

    const options = activityOptions.map((i) => ({
        label: i.activity,
        value: i.description,
    }));

    //-----------------------------------------------------------

    return (
        <Container>
            <Formik
                initialValues={{
                    legalName: '',
                    comercialName: '',
                    emailClient: '',
                    DNI: '',
                    factoryType: '',
                    areas: '',
                    country: '',
                    department: '',
                    municipality: '',
                    center: '',
                    address: '',
                    geographicalDescription: '',
                    contactName: '',
                    positionName: '',
                    emailContact: '',
                    typePhone: '',
                    phoneNumber: '',
                    economicActivity: '',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.legalName) {
                        errors.legalName = 'Requerido';
                    } else if (!/^[A-Z]+@[A-Z]+\.[A-Z]{2,}$/i.test(values.legalName)) {
                        errors.legalName = 'Error al escribir el nombre legal del cliente';
                    }
                    return errors;
                }}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {() => (
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <h1>Registrar nuevo cliente</h1>
                                <hr />
                                <h3>Datos Generales</h3>
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Nombre legal"
                                    name="legalName"
                                    fullWidth
                                />
                                <ErrorMessage name="legalName" component="div" />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Nombre comercial"
                                    name="comercialName"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Correo electrónico"
                                    type="email"
                                    name="emailClient"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Tipo documento"
                                    name="DNI"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="1">Cédula de ciudadanía</MenuItem>
                                    <MenuItem value="2">NIT</MenuItem>
                                    <MenuItem value="3">Cédula de Extranjería</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    label="Número de documento"
                                    name="DNI"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Tipo de empresa"
                                    name="factoryType"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="Interna">Interna</MenuItem>
                                    <MenuItem value="Externa">Externa</MenuItem>
                                    <MenuItem value="Otra">Otra</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Áreas"
                                    name="areas"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="Interna">Interna</MenuItem>
                                    <MenuItem value="Externa">Externa</MenuItem>
                                    <MenuItem value="Otra">Otra</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined">Agregar área</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Total empleados"
                                    type="number"
                                    name="totalEmployees"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Tipo de Teléfono"
                                    name="typePhone"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="Celular">Celular</MenuItem>
                                    <MenuItem value="Telefono fijo">Teléfono fijo</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={2}>
                                <Field
                                    as={TextField}
                                    label="Número"
                                    type="number"
                                    name="numberPhone"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="outlined">+</Button>
                            </Grid>

                            <Grid item xs={12}>
                                <h3>Datos de Contacto</h3>
                                <hr />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Nombre"
                                    name="contactName"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Field
                                    as={TextField}
                                    label="Cargo"
                                    name="positionName"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="outlined">+</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    label="Correo electrónico"
                                    type="email"
                                    name="emailContact"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Tipo de Teléfono"
                                    name="typePhone"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="Celular">Celular</MenuItem>
                                    <MenuItem value="Telefono fijo">Teléfono fijo</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    label="Número"
                                    name="phoneNumber"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Actividad Económica</h3>
                                <hr />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Descripción de la actividad económica"
                                    name="economicActivity"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Seleccione el Sector"
                                    name="selectSector"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    <MenuItem value="Construcción">Construcción</MenuItem>
                                    <MenuItem value="Educación">Educación</MenuItem>
                                    <MenuItem value="Otras Actividades de Servicios">Otras Actividades de Servicios</MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Seleccione División"
                                    name="selectDivision"
                                    fullWidth
                                >
                                    <MenuItem value="Todas"><em>Todas</em></MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Seleccione Subdivisión"
                                    name="selectSubDiv"
                                    fullWidth
                                >
                                    <MenuItem value="Todas"><em>Todas</em></MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    select
                                    label="Seleccione Actividad"
                                    name="selectActivity"
                                    fullWidth
                                >
                                    <MenuItem value="Todas"><em>Todas</em></MenuItem>
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Ubicación Geográfica</h3>
                                <hr />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    select
                                    label="País"
                                    name="country"
                                    fullWidth
                                >
                                    <MenuItem value="Seleccione"><em>Seleccione...</em></MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.value} value={country.value}>
                                            {country.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    label="Departamento"
                                    name="department"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    label="Municipio"
                                    name="municipality"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    as={TextField}
                                    label="Centro"
                                    name="center"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Dirección"
                                    name="address"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    label="Descripción geográfica"
                                    name="geographicalDescription"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Registrar Cliente
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>{t('New Activity')}</ModalHeader>
                <ModalBody>
                <Form onValidSubmit={handleActivity}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Field
                                as={TextField}
                                label={t('Activity')}
                                name="activityModal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                as={TextField}
                                label={t('Description')}
                                name="descriptionModal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                {t('Guardar')}
                            </Button>
                        </Grid>
                    </Grid>                    
                </Form>
                </ModalBody>
            </Modal>

        </Container>        
    );
};

export default ClientAdd;
