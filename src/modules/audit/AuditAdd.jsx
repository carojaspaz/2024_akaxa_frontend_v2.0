/** @format */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Formik, Field, Form } from 'formik'
import { TextField, Button, Grid, Typography, MenuItem, Container } from '@mui/material'
import { ToasterTypes } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'
import { LinearProgress } from '@mui/material'
import { parseISO, addDays, startOfDay, addHours, isValid, isBefore, format } from 'date-fns'

import { protocolService } from '../../services/protocolService'
import { clientService } from '../../services/clientService'
import { operatorService } from '../../services/operatorService'
import { scheduleService } from '../../services/scheduleService'
import Collapse from 'reactstrap/lib/Collapse'

const AuditAdd = (props) => {
  const formClient = useRef(null)
  const formCheckList = useRef(null)
  const formAuditor = useRef(null)

  const { showToaster } = useToaster()
  const [clientSubmit, setClientSubmit] = useState(false)
  const [listSubmit, setListSubmit] = useState(false)
  const [auditorSubmit, setAuditorSubmit] = useState(false)
  const [protocols, setProtocols] = useState([])
  const [operators, setOperators] = useState([])
  const [clients, setClients] = useState([])
  const [branches, setBranches] = useState([])
  const [activityOptions, setActivityOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [auditSchedule, setAuditSchedule] = useState({})
  const [noBranches, setNoBranches] = useState(true)
  const [clientId, setClientId] = useState('')
  const [branchId, setBranchId] = useState('')
  const [protocolId, setProtocolId] = useState('')
  const [protocolName, setProtocolName] = useState('')
  const [activeTab, setActiveTab] = useState(1)
  const [activeTabProgress, setActiveTabProgress] = useState(1)
  const [progressValue, setProgressValue] = useState(25)
  const [showNext, setShowNext] = useState(true)
  const [showPrev, setShowPrev] = useState(false)
  const [showCategories, setShowCategories] = useState([])
  const [drawedCategories, setDrawedCategories] = useState([])
  const [auditSummary, setAuditSummary] = useState({})

  useEffect(() => {
    loadClients()
  }, []) 

  const toggleCollapse = (i) => {
    setShowCategories((prevShowCategories) => {
      const updatedCategories = [...prevShowCategories]
      updatedCategories[i] = !updatedCategories[i]
      return updatedCategories
    })
  }

  const onOpenedCollapse = (i) => {
    setDrawedCategories((prevDrawedCategories) => {
      const updatedDrawedCategories = [...prevDrawedCategories]
      updatedDrawedCategories[i] = true
      return updatedDrawedCategories
    })
  }

  /*const loadClients = async () => {
    try {
      const response = await clientService.getClientsWithBranches()
      const { message } = response
      if (message) {
        showToaster(message, 'Clientes', ToasterTypes.Warning)
      } else {
        setClients(response)
      }
    } catch (error) {
      console.error('Error loading clients:', error)
    }
  }*/
 
    
  const onChangeClient = async (e) => {
    const selectedValue = e.target.value

    if (selectedValue === '') {
      setClientId('')
      setBranchId('')
      setProtocolId('')
      setProtocolName('')
      setProtocols([])
      setBranches([])
      setOperators([])
      setActivityOptions([])
      setCategories([])
      setListSubmit(false)
    } else {
      const selectedClient = clients.find((c) => c.id === selectedValue)
      if (selectedClient) {
        const CIIU = JSON.stringify(selectedClient.codeCIIU)

        setClientId(selectedClient.id)
        setBranchId('')
        setProtocolId('')
        setProtocolName('')
        setBranches(selectedClient.branches)
        setActivityOptions(selectedClient.activities)

        const response = await protocolService.postProtocolsBySector(CIIU)

        if (response) {
          const { message } = response
          if (message) {
            showToaster('No hay listas disponibles', 'Info', ToasterTypes.Warning)
            setProtocols([])
          } else {
            setProtocols(response.filter((p) => p.valued))
          }
        } else {
          setProtocols([])
        }
      }
    }
  }

  const onChangeBranch = (e) => {
    const value = e.target.value
    if (value === '') {
      const client = clients.find((c) => c.id === clientId)
      setBranchId('')
      setActivityOptions(client.activities)
      setNoBranches(true)
    } else {
      const branch = branches.find((b) => b.id === value)
      setBranchId(value)
      setActivityOptions(branch.activities)
      setNoBranches(false)
    }
  }

  const onChangeCheckList = (e) => {
    const value = e.target.value
    if (value === '') {
      setCategories([])
      setProtocolId('')
    } else {
      const checkList = protocols.find((p) => p.id === value)
      setCategories(checkList.categories)
      setProtocolId(value)
      setProtocolName(checkList.name)
    }
  }

  const onChangeActivity = (e, ix, jx) => {
    const newCategories = [...categories]
    if (e) {
      const todo = e.find((i) => i.value === 'TODO')
      if (todo) {
        newCategories[ix].items[jx].activities = [{ type: 'Todo', desc: 'TODO', isSelected: true }]
        newCategories[ix].items[jx].activitiesValues = [{ value: todo.value, label: todo.label }]
      } else {
        const activities = e.map((i) => ({
          type: i.label,
          desc: i.value,
          isSelected: true,
        }))
        const activitiesValue = e.map((i) => ({
          value: i.value,
          label: i.label,
        }))
        newCategories[ix].items[jx].activities = activities
        newCategories[ix].items[jx].activitiesValues = activitiesValue
      }
    } else {
      newCategories[ix].items[jx].activities = []
      newCategories[ix].items[jx].activitiesValues = []
    }
    setCategories(newCategories)
  }

  const initState = () => {
    setActiveTabProgress(1)
    setProgressValue(25)
    setShowNext(true)
    setShowPrev(false)
    setClientSubmit(false)
    setListSubmit(false)
    setAuditorSubmit(false)
    setOperators([])
  }

  const clearAll = () => {
    if (formClient.current) formClient.current.reset()
    if (formCheckList.current) formCheckList.current.reset()
    if (formAuditor.current) formAuditor.current.reset()
    setCategories([])
  }

  const toggleTab = (tab) => {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setActiveTabProgress(tab)
      }
    }
  }

  const toggleTabProgress = (tab) => {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 5) {
        switch (tab) {
          case 2:
            formClient.current.submit()
            break
          case 3:
            if (clientSubmit) formCheckList.current.submit()
            break
          case 4:
            if (clientSubmit && listSubmit) formAuditor.current.submit()
            break
          case 5:
            if (clientSubmit && listSubmit && auditorSubmit) handleValidSubmit()
            break
          default:
            initState()
            break
        }
      }
    }
  }

  const validClient = useCallback(
    (event, values) => {
      if (protocols.length > 0) {
        setProgressValue(50)
        setActiveTabProgress(2)
        setShowPrev(true)
        setShowNext(true)
        setClientSubmit(true)
      } else {
        showToaster('No hay listas disponibles', 'Info', ToasterTypes.Warning)
      }
    },
    [protocols],
  )

  const invalidClient = useCallback(() => {
    showToaster('Seleccione un cliente y/o sucursal si desea', 'Info', ToasterTypes.Warning)
  }, [])

  const validCheckList = useCallback(
    (event, values) => {
      const valid = categories.every((category) => category.items.every((item) => item.activities.length > 0))
      if (valid) {
        loadOperators() 
        setProgressValue(75)
        setActiveTabProgress(3)
        setShowPrev(true)
        setShowNext(true)
        setClientSubmit(true)
        setListSubmit(true)
      } else {
        showToaster('Verifique las actividades de los items de inspección', 'Info', ToasterTypes.Warning)
      }
    },
    [categories],
  )

  const invalidCheckList = useCallback(() => {
    showToaster('Verifique la información de la auditoría', 'Info', ToasterTypes.Warning)
  }, [])

  const validAuditorSchedule = useCallback(
    (event, values) => {
      const startDate = values.scheduleStartDate ? parseISO(values.scheduleStartDate) : null
      const endDate = values.scheduleEndDate ? parseISO(values.scheduleEndDate) : null

      if (!startDate || !endDate || !isValid(startDate) || !isValid(endDate)) {
        showToaster('Verifique la información de las fechas', 'Info', ToasterTypes.Warning)
        return 
      }

      const minStartDate = addHours(new Date(), 24) 

      if (isValid(startDate) && isValid(endDate)) {
        if (minStartDate <= startDate) {
          const minAuditTime = addHours(startDate, 8) 

          if (minAuditTime <= endDate) {
            const client = clients.find((c) => c.id === clientId)?.legalName || ''
            const branch = noBranches ? '' : branches.find((b) => b.id === branchId)?.branchOffice || ''
            const protocol = protocolName
            const auditor = operators.find((o) => o.id === values.auditor)?.firstName || ''

            const auditSummary = {
              client: client,
              branch: branch,
              protocolName: protocol,
              auditor: auditor,
            }

            setProgressValue(100)
            setActiveTabProgress(4)
            setShowPrev(true)
            setShowNext(false)
            setAuditSchedule(values)
            setClientSubmit(true)
            setListSubmit(true)
            setAuditorSubmit(true)
            setAuditSummary(auditSummary)
          } else {
            showToaster('El tiempo mínimo de auditoría es de 8 horas', 'Info', ToasterTypes.Warning)
          }
        } else {
          showToaster('La auditoría no pueden empezar el mismo dia en que se asignan', 'Info', ToasterTypes.Warning)
        }
      }
    },
    [clients, branches, operators, clientId, branchId, protocolName, noBranches],
  )

  const invalidAuditorSchedule = useCallback(() => {
    showToaster('Verifique la información del auditor', 'Info', ToasterTypes.Warning)
  }, [])

  const handleValidSubmit = async () => {
    if (clientSubmit && listSubmit && auditorSubmit) {
      const values = {
        client: clientId,
        schedule: auditSchedule,
        protocol: {
          id: protocolId,
          name: protocolName,
          categories: categories,
        },
      }

      if (!noBranches) {
        values.branch = branchId
      }

      const body = JSON.stringify(values)

      try {
        const schedule = await scheduleService.postSchedule(body)
        const { message } = schedule

        if (message) {
          toaster.ShowToaster('Error', message, ToasterTypes.Error)
        } else {
          showToaster('Auditoria', 'Auditoria Asignada Satisfactoriamente', ToasterTypes.Success)
          initState() 
          clearAll() 
        }
      } catch (error) {
        showToaster('Error', 'Hubo un problema al asignar la auditoría', ToasterTypes.Error)
      }
    }
  }

  const options = activityOptions.map((i) => ({
    label: i.activity,
    value: i.description,
  }))

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid="false">
          <Typography variant="h5">Protocolos</Typography>
          <Typography variant="h6">Asignar Auditoria</Typography>
          <Grid container>
            <Grid item xs={12}>
              <div id="progress-wizard" className="twitter-bs-wizard">
                <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                  <li className={`nav-item ${activeTabProgress === 1 ? 'active' : ''}`}>
                    <a className={`nav-link ${activeTabProgress === 1 ? 'active-step' : ''}`} onClick={() => changeStep(1)}>
                      <span className="step-number mr-2">01</span> Seleccionar Cliente
                    </a>
                  </li>
                  <li className={`nav-item ${activeTabProgress === 2 ? 'active' : ''}`}>
                    <a className={`nav-link ${activeTabProgress === 2 ? 'active-step' : ''}`} onClick={() => setActiveTabProgress(2)}>
                      <span className="step-number mr-2">02</span> Lista de Chequeo
                    </a>
                  </li>
                  <li className={`nav-item ${activeTabProgress === 3 ? 'active' : ''}`}>
                    <a className={`nav-link ${activeTabProgress === 3 ? 'active-step' : ''}`} onClick={() => setActiveTabProgress(3)}>
                      <span className="step-number mr-2">03</span> Auditor
                    </a>
                  </li>
                  <li className={`nav-item ${activeTabProgress === 4 ? 'active' : ''}`}>
                    <a className={`nav-link ${activeTabProgress === 4 ? 'active-step' : ''}`} onClick={() => setActiveTabProgress(4)}>
                      <span className="step-number mr-2">04</span> Asignar Auditoría
                    </a>
                  </li>
                </ul>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Progreso de Auditoría
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#007bff',
                        borderRadius: 5,
                        transition: 'width 0.3s ease-in-out',
                      },
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </Grid>
                <br />
                <Typography variant="h6">Las empresas clientes de nuestra asociación necesitan su proceso de evaluación, por lo cual se asignará su correspondiente lista de chequeo</Typography>
                <br />
                <div className="twitter-bs-wizard-tab-content">
                  <Formik
                    initialValues={{ client: '', branchOffice: '', protocol: '' }}
                    onSubmit={(values) => {
                    }}>
                    {({ values, setFieldValue }) => (
                      <Form>
                        {/* First Tab: Select Client */}
                        <div hidden={activeTabProgress !== 1}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography variant="h6">Seleccione la empresa Cliente</Typography>
                              <Field
                                name="client"
                                label="Seleccione la empresa Cliente"
                                component={TextField}
                                select
                                fullWidth
                                value={values.client || ''}
                                onChange={onChangeClient}>
                                {clients.map((item, i) => (
                                  <MenuItem key={i} value={item.id}>
                                    {item.legalName}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                            <hr />
                            <Grid item xs={12}>
                              <Typography variant="h6">Seleccione la Sucursal</Typography>
                              <Field name="client" label="Seleccione la Sucursal" component={TextField} select fullWidth value={values.client || ''} onChange={onChangeClient}>
                                {clients.map((item, i) => (
                                  <MenuItem key={i} value={item.id}>
                                    {item.legalName}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                        </div>

                        {/* Second Tab: Select Checklist */}
                        <div hidden={activeTabProgress !== 2}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography variant="h6">Seleccione la lista de chequeo</Typography>
                              <Field
                                name="protocol"
                                component={TextField}
                                label="Seleccione Protocolo"
                                select
                                fullWidth
                                value={values.protocol || ''} 
                                onChange={onChangeCheckList}>
                                {protocols.map((item, i) => (
                                  <MenuItem key={i} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                        </div>

                        {categories.map((category, i) => (
                          <div key={`category-${i}`}>
                            <Typography variant="h5" color="primary" onClick={() => toggleCollapse(i)} style={{ cursor: 'pointer', marginBottom: '8px' }}>
                              Categoría: {category.name}
                            </Typography>
                            <Collapse in={showCategories[i]} onEntered={() => onOpenedCollapse(i)}>
                              {drawedCategories[i] ? (
                                <div>
                                  {category.items.map((categoryItem, j) => (
                                    <div key={`category-item-${j}`}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                          <Typography variant="h6" color="secondary">
                                            {categoryItem.subjectItem}:
                                          </Typography>
                                          <Typography variant="body1">{categoryItem.inspectionItem}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                          <FormControl fullWidth>
                                            <InputLabel>Seleccione las actividades comerciales:</InputLabel>
                                            <Select multiple value={categoryItem.activitiesValues || []} onChange={(e) => onChangeActivity(e.target.value, i, j)} input={<OutlinedInput label="Seleccione las actividades comerciales" />}>
                                              {options.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                  {option.label}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                      </Grid>
                                      <hr />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                                  <CircularProgress color="success" />
                                </div>
                              )}
                            </Collapse>
                            <hr />
                          </div>
                        ))}

                        {/* Third Tab: Select Auditor */}
                        <div hidden={activeTabProgress !== 3}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography variant="h6">Seleccionar Auditor</Typography>
                              <Field
                                name="auditor"
                                label="Seleccionar Auditor"
                                component={TextField}
                                select
                                fullWidth
                                value={values.auditor || ''} 
                              >
                                {operators.map((item, i) => (
                                  <MenuItem key={i} value={item.id}>
                                    {item.firstName} {item.lastName}
                                  </MenuItem>
                                ))}
                              </Field>
                            </Grid>
                          </Grid>
                        </div>

                        {/* Fourth Tab: Audit Assignment */}
                        <div hidden={activeTabProgress !== 4}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography variant="h6">Resumen de la Auditoría</Typography>
                              <div>
                                <p>Cliente: {auditSummary.client}</p>
                                <p>Lista: {auditSummary.protocolName}</p>
                                <p>Sucursal: {auditSummary.branch}</p>
                                <p>Auditor: {auditSummary.auditor}</p>
                                <p>Inicio: {isValid(new Date(auditSchedule.scheduleStartDate)) ? format(parseISO(auditSchedule.scheduleStartDate), 'yyyy-MM-dd HH:mm') : 'Fecha no válida'}</p>
                                <p>Fin: {isValid(new Date(auditSchedule.scheduleEndDate)) ? format(parseISO(auditSchedule.scheduleEndDate), 'yyyy-MM-dd HH:mm') : 'Fecha no válida'}</p>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                        <br />
                        {/* Navigation buttons */}
                        <Grid container>
                          <Grid item>
                            <Button variant="contained" color="primary" onClick={() => setActiveTabProgress(activeTabProgress - 1)} disabled={activeTabProgress === 1}>
                              Anterior
                            </Button>
                          </Grid>
                          
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={() => {
                                if (activeTabProgress === 4) {
                                  // Finalize action
                                } else {
                                  setActiveTabProgress(activeTabProgress + 1)
                                }
                              }}>
                              {activeTabProgress === 4 ? 'Asignar Auditoría' : 'Siguiente'}
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AuditAdd
