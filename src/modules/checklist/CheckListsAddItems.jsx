/** @format */
import React, { useState, useEffect, useRef } from 'react'
import { TextField, Button, Grid, MenuItem, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Modal, CircularProgress } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ToasterTypes } from '../../helpers/config/constants'
import useToaster from '../../helpers/common/toaster'
import { useTranslation } from 'react-i18next'

// Servicios
import { categoryService } from '../../services/categoryService.js'
import { commonService } from '../../services/commonService.js'
import { itemService } from '../../services/itemService.js'
import { inspectionService } from '../../services/inspectionService'

// Componente personalizado
import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector'


const CheckListsAddItems = () => {
    const [categoryId, setCategoryId] = useState('')
    const [catSector, setCatSector] = useState([])
    const [categories, setCategories] = useState([])
    const [conditions, setConditions] = useState([])
    const [rows, setRows] = useState([])
    const [risk, setRisk] = useState('')
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()
    const { showToaster } = useToaster()

    useEffect(() => {
        loadRiskConditions(); 
        loadCategories();
    }, [])

    const loadRiskConditions = async () => {
        setLoading(true)
        const response = await commonService.getRiskConditions()
        if (response?.message) {
            showToaster('Error', response.message, ToasterTypes.Error)
        } else {
            setConditions(response)
        }
        setLoading(false)
    }


    const loadCategories = async () => {
        const response = await inspectionService.getCategories()
        if (response?.message) {
            showToaster('Error', response.message, ToasterTypes.Error)
        } else {
            setCategories(response)
        }
    }

    // Cargar items por categoría
    const loadItemsList = async (id) => {
        const response = await itemService.getItemsByCategoryId(id)
        if (response) {
            const newRows = response.map((i) => ({
                conditionRisk: i.conditionRisk,
                subject: i.subject,
                item: i.item,
                inspectorCategory: i.inspectorCategory,
                handleEdit: (
                    <Button variant="contained" color="primary" href={`/admin/category/item/edit/${i.id}`}>
                        Editar
                    </Button>
                ),
            }))
            setRows(newRows)
        }
    }

    const activitiesChangeHandler = async (code) => {
        const categories = await inspectionService.getCategories(JSON.stringify(code))
        if (categories?.message) {
            setCategories([])
            setRows([])
            showToaster('Error', categories.message, ToasterTypes.Error)
        } else {
            setActivities(categories)
        }
    }

    const resetDataHandler = () => {
        setCategoryId('')
        setRows([])
        setCategories([])
    }

    const onChangeCategory = async (e) => {
        const categoryId = e.target.value
        if (categoryId === 'noSelected') {
            setRows([])
            setCategoryId('')
            setCatSector([])
            showToaster('Error', 'Debe seleccionar una categoría', ToasterTypes.Error)
        } else {
            setCategoryId(categoryId)
            loadCategoryById(categoryId)
            loadItemsList(categoryId)
        }
    }

    const onChangeSelectRisk = (e) => {
        setRisk(e.target.value !== 'noSelected' ? e.target.value : '')
    }

    const loadCategoryById = async (code) => {
        const response = await categoryService.getCategoriesById(code)
        if (response?.message) {
            showToaster('Error', response.message, ToasterTypes.Error)
        } else {
            setCatSector(response)
        }
    }

    const handleValidSubmit = async (event, values) => {
        if (categoryId === '') {
            showToaster('Info', 'Debe seleccionar una categoría', ToasterTypes.Warning)
        } else if (risk === '') {
            showToaster('Info', 'Debe seleccionar un nivel de riesgo', ToasterTypes.Warning)
        } else {
            const body = JSON.stringify({
                idInspectionCategory: values.idInspectionCategory,
                item: values.item,
                subject: values.subject,
                activities: activities,
                idConditionRisk: values.idConditionRisk,
            })
            const response = await itemService.postItem(body)
            if (response?.message) {
                showToaster('Error', response.message, ToasterTypes.Error)
            } else {
                showToaster('Item', 'Item creado satisfactoriamente', ToasterTypes.Success)
            }
            loadItemsList(categoryId)
        }
    }
    return (
        <Formik
            initialValues={{
                idInspectionCategory: '',
                item: '',
                subject: '',
                idConditionRisk: '',
            }}
            onSubmit={handleValidSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <Container fluid>
                        <Typography title="Agregar Items" />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper>
                                    <br/>
                                    <Typography variant="h4">{t('Seleccione la actividad económica')}</Typography>
                                    <br/>
                                    <hr />
                                    <BusinessSectorSelector
                                        newCode
                                        isCategory
                                        onChange={activitiesChangeHandler}
                                        onReset={resetDataHandler}
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                fullWidth
                                                label={t('Seleccione la Categoría')}
                                                onChange={e => {
                                                    setFieldValue('idInspectionCategory', e.target.value);
                                                    onChangeCategory(e);
                                                }}
                                                value={values.idInspectionCategory}
                                                required
                                            >
                                                <MenuItem value="noSelected">{t('Seleccione...')}</MenuItem>
                                                {categories.map((item, i) => (
                                                    <MenuItem key={i} value={item.id}>
                                                        {item.sector} - {t(item.subject)}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography>{`${t('Sector')}: ${t(catSector.sector)}`}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>{`${t('División')}: ${t(catSector.division)}`}</Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label={t('Tema General')}
                                                name="subject"
                                                required
                                                value={values.subject}
                                                onChange={e => setFieldValue('subject', e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                fullWidth
                                                label={t('Condición de riesgo')}
                                                name="idConditionRisk"
                                                onChange={e => {
                                                    setFieldValue('idConditionRisk', e.target.value);
                                                    onChangeSelectRisk(e);
                                                }}
                                                required
                                                value={values.idConditionRisk}
                                            >
                                                <MenuItem value="noSelected">{t('Seleccione...')}</MenuItem>
                                                {conditions.map((item, i) => (
                                                    <MenuItem key={i} value={item.id}>
                                                        {t(item.risk)}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label={t('Ingresar Item a inspeccionar')}
                                                name="item"
                                                multiline
                                                rows={3}
                                                required
                                                value={values.item}
                                                onChange={e => setFieldValue('item', e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button type="submit" color="primary" variant="contained" fullWidth>
                                                {t('Guardar Items')}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('Condición')}</TableCell>
                                    <TableCell>{t('Tema')}</TableCell>
                                    <TableCell>{t('Descripción')}</TableCell>
                                    <TableCell>{t('Nivel')}</TableCell>
                                    <TableCell>{t('Editar')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.conditionRisk}</TableCell>
                                        <TableCell>{row.subject}</TableCell>
                                        <TableCell>{row.item}</TableCell>
                                        <TableCell>{row.inspectorCategory}</TableCell>
                                        <TableCell>{row.handleEdit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Form>
            )}
        </Formik>
    )
}

export default CheckListsAddItems
