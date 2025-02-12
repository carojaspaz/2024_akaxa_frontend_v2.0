/** @format */

import React, { useState, useEffect, useRef } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import { Grid, TextField, Button, Select, MenuItem, FormHelperText, InputLabel, FormControl, Typography, Box, Collapse, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent } from '@mui/material'
import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector'
import { Protocols } from '../../helpers/config/constants'
import { protocolService } from '../../services/protocolService'
import { ToasterTypes} from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre de la lista es obligatorio.'),
  listTypes: Yup.array().min(1, 'Debes seleccionar al menos un tipo de lista.').required('Selecciona al menos un tipo de lista.'),
  categories: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('El nombre de la categoría es obligatorio.'),
        items: Yup.array().min(1, 'Cada categoría debe tener al menos un ítem.').required(),
      }),
    )
    .min(2, 'Debes configurar al menos dos categorías con ítems.'),
})

const ProtocolEvaluation = (props) => {
  const { showToaster } = useToaster()
  const [categories, setCategories] = useState([])
  const [state, setState] = useState({
    min: Protocols.minValue,
    max: Protocols.maxValue,
    step: Protocols.step,
    protocols: [],
    protocol: {
      id: '',
      name: '',
      categories: [],
    },
    showCategories: [],
    drawedCategories: [],
    factorTotal: 0,
    viewSubmit: false,
    rows: [],
  })
  const formRef = useRef(null)

  useEffect(() => {
    loadProtocolsNameId({})
  }, [])

  const loadProtocolsNameId = async (code) => {
    setState((prevState) => ({
      ...prevState,
      protocols: [],
    }))
    const response = await protocolService.postProtocolsBySector(JSON.stringify(code))
    const { message } = response
    if (message) {
      showToaster( message,'Protocolos', ToasterTypes.Warning)
    } else {
      const rows = response.map((r) => ({
        id: r.id,
        name: r.name,
        valued: r.valued ? 'Valorada' : 'Sin Valoración',
        handleValued: (
          <Button
            color="secondary"
            onClick={() => selectProtocol(r.id)}
            variant="contained"
            startIcon={<i className="mdi mdi-card-account-details mr-1"></i>}
          >
            Seleccionar
          </Button>
        ),
      }))
      setState((prevState) => ({
        ...prevState,
        protocols: response,
        rows: rows,
      }))
    }
  }

  const selectProtocol = (id) => {
    const protocol = state.protocols.find((p) => p.id === id)
    if (protocol) {
      const factorTotal = protocol.categories.reduce((acc, cat) => acc + cat.factor, 0)
      const showCategories = Array(protocol.categories.length).fill(false)
      const drawedCategories = Array(protocol.categories.length).fill(false)
      setState({
        protocol: protocol,
        factorTotal: factorTotal,
        viewSubmit: true,
        showCategories: showCategories,
        drawedCategories: drawedCategories,
      })
    } else {
      showToaster('Info', 'No hay categoría seleccionada', ToasterTypes.Info)
    }
  }

  const onChangeTotalCategory = (e, i) => {
    const value = Number(e.target.value)
    if (value >= 1) {
      const updatedProtocol = { ...state.protocol }
      updatedProtocol.categories[i].factor = value
      const factorTotal = updatedProtocol.categories.reduce((acc, cat) => acc + cat.factor, 0)
      setState({
        protocol: updatedProtocol,
        factorTotal: factorTotal,
      })
      if (factorTotal > 100) {
        showToaster('Error', 'Los factores suman más de 100%', ToasterTypes.Error)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (state.factorTotal === 100) {
      const protocolSend = JSON.stringify(state.protocol)
      const response = await protocolService.putUpdateProtocol(state.protocol.id, protocolSend)
      const { message } = response
      if (message) {
        showToaster('Error', message, ToasterTypes.Error)
      } else {
        showToaster(props.t('Valoración Establecida'), props.t('Felicitaciones'), ToasterTypes.Success)
        setState({
          protocol: {
            id: '',
            name: '',
            categories: [],
          },
          showCategories: [],
          drawedCategories: [],
          viewSubmit: false,
        })
      }
    } else {
      showToaster('La sumatoria de los Factores Porcentuales debe ser igual a 100%', 'Protocolos', ToasterTypes.Error)
    }
  }

  const toggleCollapse = (i) => {
    const updatedShowCategories = [...state.showCategories]
    updatedShowCategories[i] = !updatedShowCategories[i]
    setState((prevState) => ({
      ...prevState,
      showCategories: updatedShowCategories,
    }))
  }

  const onOpenedCollapse = (i) => {
    const updatedDrawedCategories = [...state.drawedCategories]
    updatedDrawedCategories[i] = true
    setState((prevState) => ({
      ...prevState,
      drawedCategories: updatedDrawedCategories,
    }))
  }

  return (
    <Formik
      initialValues={{
        name: '',
        listTypes: [],
        activityCode: '',
        categories: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <div className="page-content">
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  {/* Formulario 1: Nombre de la Lista */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de la Lista de Chequeo"
                      name="name"
                      value={values.name}
                      onChange={(e) => setFieldValue('name', e.target.value)}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  {/* Formulario 1: Tipos de Lista */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.listTypes && Boolean(errors.listTypes)}>
                      <InputLabel id="list-types-label">Tipos de Lista</InputLabel>
                      <Select
                        labelId="list-types-label"
                        multiple
                        value={values.listTypes}
                        onChange={(e) => setFieldValue('listTypes', e.target.value)}
                      >
                        <MenuItem value="Tipo 1">Tipo 1</MenuItem>
                        <MenuItem value="Tipo 2">Tipo 2</MenuItem>
                        <MenuItem value="Tipo 3">Tipo 3</MenuItem>
                      </Select>
                      {touched.listTypes && errors.listTypes && <FormHelperText>{errors.listTypes}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Formulario 1: Selector de Código de Actividad */}
                  <Grid item xs={12}>
                    <BusinessSectorSelector
                      onSelect={(code) => {
                        setFieldValue('activityCode', code);
                        // Aquí deberías cargar categorías
                        setState({
                          ...state,
                          protocol: {
                            categories: [
                              { id: 1, name: 'Categoría 1', items: [] },
                              { id: 2, name: 'Categoría 2', items: [] },
                            ],
                          },
                        });
                      }}
                    />
                  </Grid>

                  {/* Formulario 1: Categorías e Ítems */}
                  <FieldArray
                    name="categories"
                    render={(arrayHelpers) => (
                      <Grid item xs={12}>
                        <Typography variant="h6">Categorías</Typography>
                        {values.categories.map((category, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <TextField
                              fullWidth
                              label="Nombre de la Categoría"
                              value={category.name}
                              onChange={(e) => setFieldValue(`categories[${index}].name`, e.target.value)}
                              error={touched.categories?.[index]?.name && Boolean(errors.categories?.[index]?.name)}
                              helperText={touched.categories?.[index]?.name && errors.categories?.[index]?.name}
                            />
                            <FieldArray
                              name={`categories[${index}].items`}
                              render={(itemHelpers) => (
                                <Box>
                                  {category.items.map((item, itemIndex) => (
                                    <TextField
                                      key={itemIndex}
                                      fullWidth
                                      label={`Ítem ${itemIndex + 1}`}
                                      value={item}
                                      onChange={(e) => setFieldValue(`categories[${index}].items[${itemIndex}]`, e.target.value)}
                                      sx={{ mt: 1 }}
                                    />
                                  ))}
                                  <Button onClick={() => itemHelpers.push(`Nuevo ítem ${category.items.length + 1}`)}>Agregar Ítem</Button>
                                </Box>
                              )}
                            />
                          </Box>
                        ))}
                        <Button onClick={() => arrayHelpers.push({ name: '', items: [] })}>Agregar Categoría</Button>
                      </Grid>
                    )}
                  />

                  {/* Tabla de Protocolos */}
                  <Grid item xs={12}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Valorada</TableCell>
                          <TableCell>Valorar</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {state.rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.valued}</TableCell>
                            <TableCell>{row.handleValued}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>

                  {/* Mostrar las Categorías con su Factor */}
                  {state.protocol.categories.map((category, i) => (
                    <Grid item xs={12} key={i}>
                      <Card>
                        <CardContent>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="h6" color="primary" onClick={() => toggleCollapse(i)}>
                                {category.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: 'right' }}>
                              <FormControl>
                                <InputLabel>Factor</InputLabel>
                                <Input
                                  type="number"
                                  value={category.factor || 0}
                                  onChange={(e) => onChangeTotalCategory(e, i)}
                                  min={0}
                                  max={100}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={3} style={{ textAlign: 'right' }}>
                              <Button onClick={() => toggleCollapse(i)} color="info">
                                {state.showCategories[i] ? 'Collapse' : 'Expand'}
                              </Button>
                            </Grid>
                          </Grid>
                          <Collapse in={state.showCategories[i]}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Criticidad</TableCell>
                                  <TableCell>Item de Inspección</TableCell>
                                  <TableCell>Safety&amp;Trust</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {category.items.map((item, j) => (
                                  <TableRow key={j}>
                                    <TableCell>{item.risk}</TableCell>
                                    <TableCell>{item.inspectionItem}</TableCell>
                                    <TableCell>
                                      <Button color="primary">Seleccionar</Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}

                  {/* Botón Guardar */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={values.categories.length < 2}>
                      Guardar Lista
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProtocolEvaluation
