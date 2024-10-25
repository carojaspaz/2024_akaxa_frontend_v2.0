/** @format */
import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Grid, MenuItem, Container } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
//
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { ToasterTypes, ParamTypes, Patterns } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'

//Import Breadcrumb
//import Breadcrumbs from '../../components/Common/Breadcrumbs';

// Custom components
import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector'
import AddressSelector from '../../components/common/AddressSelector/AddressSelector'
import ContactClient from '../../components/common/ContactClient/ContactClient'
import Phones from '../../components/common/Phones/Phones'

// Services
import { clientService } from '../../services/clientService'
import { commonService } from '../../services/commonService.js'
//

const validationSchema = Yup.object({
  legalName: Yup.string().required('Campo requerido'),
  businessName: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  identification: Yup.string().required('Seleccione una opción'),
  typeCompany: Yup.string().required('Campo requerido'),
  //activities: Yup.string().required('Campo requerido'),
  totalEmployees: Yup.number().min(1, 'Debe ser al menos 1 empleado').required('Campo requerido'),
  description: Yup.string().required('Campo requerido'),
})

const ClientAdd = () => {
  const { showToaster } = useToaster()

  //-----------------------------------------------------------

  const [modal, setModal] = useState(false)
  const [docTypes, setDocTypes] = useState([])
  const [activities, setActivities] = useState([])
  const [countriesOptions, setCountriesOptions] = useState([])
  const [companyOptions, setCompanyOptions] = useState([])
  const { t } = useTranslation()
  const formRef = useRef(null)

  useEffect(() => {
    loadDocTypes()
    loadCompanyTypes()
    loadActivitiesVerify()
    loadCountries()
  }, [])

  const toggleModal = () => {
    setModal((prevState) => !prevState)
  }

  const loadCountries = async () => {
    const response = await commonService.getActiveCountries()
    if (response) {
      const newCountriesOptions = response.map((i) => ({
        value: i.code,
        label: i.name,
      }))
      setCountriesOptions(newCountriesOptions)
    }
  }

  const loadDocTypes = async () => {
    const response = await commonService.getParameters(ParamTypes.documentTypes)
    if (response) {
      const newDocTypes = response.map((i) => ({
        value: i,
        label: i,
      }))
      setDocTypes(newDocTypes)
    }
  }

  const loadActivitiesVerify = async () => {
    const response = await commonService.getActivitiesVerify()
    if (response) {
      const newActivitiestype = response.map((i) => ({
        label: i.activity,
        value: i.description,
      }))
      setActivities(newActivitiestype)
    }
  }

  const loadCompanyTypes = async () => {
    const response = await commonService.getCompanyType()
    if (response) {
      const newCompanyTypes = response.map((i) => ({
        value: i.id,
        label: i.type,
      }))
      setCompanyOptions(newCompanyTypes)
    }
  }

  const onChangeActivity = (selectedOptions) => {
    console.log(selectedOptions)
    if (selectedOptions) {
      const todo = selectedOptions.find((i) => i.value === 'TODO')
      if (todo) {
        const newActivities = [{ type: 'TODO', isSelected: true }]
        setActivityValues([{ value: todo.value, label: todo.label }])
        setActivities(newActivities)
      } else {
        const newActivities = selectedOptions.map((i) => ({
          type: i.value,
          isSelected: true,
        }))
        const newActivityValues = selectedOptions.map((i) => ({
          value: i.value,
          label: i.label,
        }))
        setActivityValues(newActivityValues)
        setActivities(newActivities)
      }
    } else {
      setActivityValues([])
      setActivities([])
    }
  }

  const handleActivity = async (event, values) => {
    const body = JSON.stringify(values)
    const response = await commonService.postActivityVerify(body)
    if (response) {
      loadActivitiesVerify()
      toggleModal()
    }
  }

  const handleValidSubmit = async (values, { resetForm }) => {
    if (activities.length > 0) {
      values.activities = activities
      const body = JSON.stringify(values)
      const response = await clientService.postClient(body)
      const { message } = response
      if (message) {
        showToaster(message, 'Error', ToasterTypes.Error)
      } else {
        showToaster('Create Client Success', 'Create Client', ToasterTypes.Success)
        const profile = {
          firstName: values.legalName,
          lastName: values.businessName,
          identification: values.identification,
          phones: values.phones,
          email: values.email,
        }
        //await clientService.postProfileClient(response, JSON.stringify(profile)) - Revisar error de Backend
        resetForm()
      }
    } else {
      showToaster('Debe escoger al menos una actividad.', 'Error', ToasterTypes.Error)
    }
  }

  //-----------------------------------------------------------

  return (
    <Container>
      <Formik
        initialValues={{
          legalName: '',
          businessName: '',
          email: '',
          identification: {
            type: '',
            number: '',
          },
          typeCompany: '',
          activities: [
            {
              type: 'PROD',
              isSelected: true,
            },
          ],
          totalEmployees: '',
          phones: [
            {
              type: '',
              number: '',
            },
          ],
          description: '',
          contacts: [
            {
              name: '',
              position: '',
              email: '',
              phone: {
                type: '',
                number: '',
              },
            },
          ],
          codeCIIU: {
            sector: '',
            division: '',
            subdivision: '',
            activity: '',
            activityName: '',
          },
          address: {
            country: '',
            firstPoliticalDivision: '',
            secondPoliticalDivision: '',
            thirdPoliticalDivision: '',
            address: '',
            description: '',
            latitude: 1.2131716,
            longitude: -77.285516,
          },
        }}
        //validationSchema={validationSchema}
        onSubmit={handleValidSubmit}>
        {() => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <h1>Registrar nuevo cliente</h1>
                <hr />
                <h3>Datos Generales</h3>
              </Grid>

              <Grid item xs={6}>
                <Field as={TextField} label="Nombre legal" name="legalName" required fullWidth />
                <ErrorMessage name="legalName" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} label="Nombre comercial" name="businessName" required fullWidth />
                <ErrorMessage name="businessName" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} label="Correo electrónico" type="email" name="email" required fullWidth />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={3}>
                <Field as={TextField} select label="Tipo documento" name="identification.type" required fullWidth>
                  <MenuItem value="Seleccione">
                    <em>Seleccione...</em>
                  </MenuItem>
                  {docTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="identification.type" component="div" />
              </Grid>
              <Grid item xs={3}>
                <Field as={TextField} label="Número de documento" name="identification.number" required fullWidth />
                <ErrorMessage name="identification.number" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} select label="Tipo de empresa" name="typeCompany" required fullWidth>
                  <MenuItem value="Seleccione">
                    <em>Seleccione...</em>
                  </MenuItem>
                  {companyOptions.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="typeCompany" component="div" />
              </Grid>
              {/*<Grid item xs={4}>
                <Field as={TextField} select label="Áreas" name="activities" fullWidth>
                  <MenuItem value="Seleccione">
                    <em>Seleccione...</em>
                  </MenuItem>
                  {activities.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="activities" component="div" />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Agregar área
                </Button>
              </Grid>*/}
              <Grid item xs={6}>
                <Field as={TextField} label="Total empleados" type="number" name="totalEmployees" required fullWidth />
                <ErrorMessage name="totalEmployees" component="div" />
              </Grid>

              <Grid item xs={6}>
                <Phones name="phones" max={2} required />
              </Grid>

              <Grid item xs={12}>
                <Field as={TextField} label="Descripción" name="description" fullWidth />
              </Grid>

              <Grid item xs={12}>
                <ContactClient name="contacts" max={2} />
              </Grid>

              <Grid item xs={12}>
                <BusinessSectorSelector name="codeCIIU" />
              </Grid>

              <Grid item xs={12}>
                <AddressSelector name="address" countriesOptions={countriesOptions} />
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
                <Field as={TextField} label={t('Activity')} name="activityModal" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Field as={TextField} label={t('Description')} name="descriptionModal" fullWidth />
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
  )
}

export default ClientAdd
