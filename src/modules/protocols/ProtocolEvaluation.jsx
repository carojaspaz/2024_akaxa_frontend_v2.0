import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Button, Select, Typography, Card, CardContent, Container } from '@mui/material';
import BusinessSectorSelector from '../../components/common/BusinessSectorSelector/BusinessSectorSelector';
import { ToasterTypes } from '../../helpers/config/constants';
import useToaster from '../../helpers/common/toaster';
import { useTranslation } from 'react-i18next';

import { protocolService } from '../../services/protocolService';
import { commonService } from '../../services/commonService';
import { itemService } from '../../services/itemService.js';
import { inspectionService } from '../../services/inspectionService';

const CreateCheckList = () => {
  const { showToaster } = useToaster()
  const { t } = useTranslation();

  const [errorTypeList, setErrorTypeList] = useState(false);
  const [typeLists, setTypeLists] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [thematic, setThematic] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ categoryId: '', categoryTitle: '' });
  const [loadItems, setLoadItems] = useState([]);
  const [enableAddButton, setEnableAddButton] = useState(false);
  const [disabledSelectors, setDisabledSelectors] = useState(false);
  const [showProtocolCategory, setShowProtocolCategory] = useState(false);
  const [protocolCategories, setProtocolCategories] = useState([]);
  const [vulnerabilityCategory, setVulnerabilityCategory] = useState(0);

  const formikRef = useRef(null);
  const toaster = useToaster();

  useEffect(() => {
    const fetchTypeLists = async () => {
      const typeList = await commonService.getTypeList();
      if (typeList) {
        setTypeLists(typeList);
      }
    };
    fetchTypeLists();
  }, []);

  const activitiesChangeHandler = async (code) => {
    const categories = await inspectionService.getCategories(JSON.stringify(code));
    if (categories?.message) {
      setThematic([]);
      setSelectedCategory({});
      setLoadItems([]);
      showToaster('Error', categories.message, ToasterTypes.Error);
    } else {
      setThematic(categories);
      setSelectedCategory({});
      setLoadItems([]);
    }
  };

  const onChangeCategory = async (e) => {
    const val = e.target.value;
    const text = e.target.options[e.target.selectedIndex].text;
    const selectedItem = { categoryId: val, categoryTitle: text };

    if (val !== 'All') {
      const existingCategory = protocolCategories.find((c) => c.category.categoryId === val);
      if (existingCategory) {
        setEnableAddButton(false);
        setSelectedCategory(selectedItem);
      } else {
        const category = thematic.find((el) => el.id === val);
        if (category?.evaluationType === 'vulnerability' && vulnerabilityCategory === 1) {
          toaster.ShowToaster('Solo puede existir una categoría de análisis de vulnerabilidad', 'Categoría', ToasterTypes.Warning);
          setEnableAddButton(false);
          setSelectedCategory({});
          setLoadItems([]);
        } else {
          const dataItem = await itemService.getItemsByCategoryId(val);
          setEnableAddButton(true);
          setSelectedCategory(selectedItem);
          setLoadItems(dataItem);
        }
      }
    } else {
      setEnableAddButton(false);
      setSelectedCategory({});
      setLoadItems([]);
    }
  };

  const selectTypeList = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
    setErrorTypeList(selectedOptions.length === 0);
  };

  const addInspectionCategoryProtocol = () => {
    const category = thematic.find((el) => el.id === selectedCategory.categoryId);
    const addCategory = { category: selectedCategory, items: loadItems, noItems: category?.noItems || false };

    if (!addCategory.noItems && addCategory.items.length === 0) {
      showToaster('La categoría seleccionada no tiene items', 'Advertencia', ToasterTypes.Warning);
    } else {
      if (category?.evaluationType === 'vulnerability') {
        setVulnerabilityCategory(1);
      }
      setProtocolCategories([...protocolCategories, addCategory]);
      setShowProtocolCategory(true);
      setDisabledSelectors(true);
      setEnableAddButton(false);
    }
  };

  const removeInspectionCategoryProtocol = (index) => {
    const updatedCategories = [...protocolCategories];
    const category = updatedCategories[index];

    if (category?.category.evaluationType === 'vulnerability') {
      setVulnerabilityCategory(0);
    }

    updatedCategories.splice(index, 1);
    setProtocolCategories(updatedCategories);
    setEnableAddButton(updatedCategories.some((c) => c.category.categoryId === selectedCategory.categoryId) ? false : true);
    setDisabledSelectors(updatedCategories.length > 0);
    setShowProtocolCategory(updatedCategories.length > 0);
  };

  const validateItemsCategory = () => {
    return protocolCategories.every((c) => c.noItems || c.items.some((i) => i.value));
  };

  const handleSubmit = async (values) => {
    if (selectedTypes.length === 0) {
      setErrorTypeList(true);
    }
    if (validateItemsCategory()) {
      let categories = protocolCategories.map((item) => ({
        id: item.category.categoryId,
        items: item.items.filter((i) => i.value).map((i) => ({ id: i.id, conditionRisk: i.conditionRiskCode })),
        noItems: item.noItems,
      }));

      if (categories.length >= 2) {
        const protocol = {
          name: values.name,
          typesList: selectedTypes.map((s) => s.value),
          ciiu: values.codeCIIU,
          categories,
        };
        const response = await protocolService.saveProtocol(JSON.stringify(protocol));

        if (response.message) {
          showToaster('Error', response.message, ToasterTypes.Error);
        } else {
          showToaster('Lista de Chequeo creada Satisfactoriamente', 'Lista', ToasterTypes.Success);
          formikRef.current.resetForm();
        }
      } else {
        showToaster('La lista debe contener mínimo 2 categorías', 'Lista', ToasterTypes.Warning);
      }
    } else {
      showToaster('Existen categorías sin items seleccionados', 'Info', ToasterTypes.Warning);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo es obligatorio"),
    inspectionCategory: Yup.string().required("Debe seleccionar una categoría"),
  });

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h6">{t('Check Lists')} - {t('Create')}</Typography>
          <Typography variant="body2">
            La selección de los niveles de las temáticas permitirán la visualización de los ítems.
          </Typography>
          <Formik
            initialValues={{ name: '', inspectionCategory: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form>
                <BusinessSectorSelector
                  newCode
                  onChange={(value) => setFieldValue('businessSector', value)}
                  onReset={() => setFieldValue('businessSector', '')}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      label="Nombre de la Lista de Chequeo"
                      name="name"
                      fullWidth
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1">Tipo de lista:</Typography>
                    <Select
                      multiple
                      value={selectedTypes}
                      onChange={(event) => setSelectedTypes(event.target.value)}
                      displayEmpty
                      renderValue={(selected) => (selected.length ? selected.join(', ') : 'Seleccione...')}
                      fullWidth
                    >
                      {typeLists.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Field as="select" name="inspectionCategory" className="form-control">
                      <option value="">Seleccionar...</option>
                      {thematic.map((item, i) => (
                        <option key={i} value={item.id}>{item.subject}</option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => setShowProtocolCategory(true)}
                      disabled={!enableAddButton}
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
                <hr />

                {showProtocolCategory && protocolCategories.map((item, i) => (
                  <div key={i}>
                    <Typography variant="h6" className="bg-soft-info text-primary p-2 rounded">
                      Categoría: {item.category.categoryTitle}
                    </Typography>
                    <Grid container>
                      <Grid item xs={12}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Seleccionar</th>
                              <th>Criticidad</th>
                              <th>Tema General</th>
                              <th>Ítem de Inspección</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.items.map((itemCategory, j) => (
                              <tr key={j}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={itemCategory.value}
                                    onChange={() => { }}
                                  />
                                </td>
                                <td>
                                  <Link to="#">{itemCategory.conditionRisk}</Link>
                                </td>
                                <td>{itemCategory.subject}</td>
                                <td>{itemCategory.item}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={8}></Grid>
                      <Grid item xs={4}>
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={() => { }}
                        >
                          Remover
                        </Button>
                      </Grid>
                    </Grid>
                    <hr />
                  </div>
                ))}

                {showProtocolCategory && (
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={4}>
                      <Button type="submit" color="primary" variant="contained" fullWidth>
                        Guardar Lista de Chequeo
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateCheckList;
