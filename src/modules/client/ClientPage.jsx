/** @format */

import React from 'react'

import { DataGrid } from '@mui/x-data-grid'

import useThemeStore from '../../store/themeStore'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'legalName', headerName: 'Nombre Empresa', width: 200 },
  { field: 'activity', headerName: 'Actividad', width: 700 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Estado', width: 130 },
]

const rows = [
  { id: 1, legalName: 'Nombre Legal Empresa 1', activity: 'Comercio al por menor en establecimientos no especializados con surtido com­puesto principalmente por alimentos, bebidas o tabaco.', email: 'empresa1@yopmail.com', status: 'Activo' },
]

const ClientPage = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default ClientPage
