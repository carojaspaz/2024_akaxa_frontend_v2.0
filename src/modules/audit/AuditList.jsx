/** @format */

import React, { useState } from 'react'
import { Container, Grid, Button, Card, CardContent, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// import { scheduleService } from '../../services/scheduleService'
// import useToaster from '../../helpers/common/toaster'

const AuditList = (props) => {
  // const { showToaster } = useToaster()
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Datos quemados para la tabla
  const staticRows = [
    {
      id: 1,
      protocolName: 'Evaluación 1',
      clientBusinessName: 'Empresa A',
      branchOfficeName: 'Sucursal X',
      scheduleStartDate: '2024/02/01',
      auditStatus: 'Completado',
      handleView: <Button variant="contained" color="info">{t('Resultados')}</Button>,
    },
    {
      id: 2,
      protocolName: 'Evaluación 2',
      clientBusinessName: 'Empresa B',
      branchOfficeName: 'Sucursal Y',
      scheduleStartDate: '2024/02/02',
      auditStatus: 'En proceso',
      handleView: (
        <Button variant="contained" color="info" onClick={() => navigate(`/protocol-result/2`)}>
          {t('Resultados')}
        </Button>
      ),
    },
    {
      id: 3,
      protocolName: 'Evaluación 3',
      clientBusinessName: 'Empresa C',
      branchOfficeName: 'Sucursal Z',
      scheduleStartDate: '2024/02/03',
      auditStatus: 'Pendiente',
      handleView: t('Evaluación no disponible'),
    },
  ]

  // useEffect(() => {
  //   loadScheduleProtocol()
  // }, [])

  // const loadScheduleProtocol = async () => {
  //   try {
  //     const response = await scheduleService.getAuditAll()
  //     if (response.message) {
  //       showToaster(response.message, 'Clientes', ToasterTypes.Warning)
  //     } else {
  //       setRows(
  //         response.map((i) => ({
  //           id: i.id,
  //           protocolName: i.protocolName,
  //           clientBusinessName: i.clientBusinessName,
  //           branchOfficeName: i.clientLegalName,
  //           scheduleStartDate: format(new Date(i.scheduleStartDate), 'yyyy/MM/dd'),
  //           auditStatus: i.auditStatusLabel,
  //           handleView:
  //             i.auditStatus === 'InProcess' ? (
  //               <Button variant="contained" color="info" onClick={() => navigate(`/protocol-result/${i.id}`)}>
  //                 {t('Resultados')}
  //               </Button>
  //             ) : (
  //               t('Evaluación no disponible')
  //             ),
  //         })),
  //       )
  //     }
  //   } catch (error) {
  //     console.error('Error al cargar auditorías', error)
  //   }
  // }

  const columns = [
    { field: 'protocolName', headerName: t('Nombre Evaluación'), flex: 1 },
    { field: 'clientBusinessName', headerName: t('Principal'), flex: 1 },
    { field: 'branchOfficeName', headerName: t('Sucursal'), flex: 1 },
    { field: 'scheduleStartDate', headerName: t('Fecha'), flex: 1 },
    { field: 'auditStatus', headerName: t('Estado'), flex: 1 },
    {
      field: 'handleView',
      headerName: t('Ver'),
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value,
    },
  ]

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>{props.title}</h1>
      </Grid>
      <Grid item xs={4} alignContent={'center'}>
        <Link to="/audit/addAudit">
          <Button variant="contained">Registrar Auditoria</Button>
        </Link>
      </Grid>
      <Container>
        <Typography variant="h4" gutterBottom>
          {t('Verificar Listado de Auditorías')}
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DataGrid rows={staticRows} columns={columns} pageSizeOptions={[5, 10, 20]} pagination autoHeight />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  )
}

export default AuditList
