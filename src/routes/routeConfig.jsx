/** @format */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage, LogoutPage } from '../modules/auth'
import { HomePage } from '../modules/home'
import { ClientPage, ClientList, ClientAdd, ClientDetail } from '../modules/client'
import { NotFoundPage } from '../modules/common'
import { OperatorPage, OperatorAdd, OperatorList, OperatorDetail } from '../modules/operator'
import { CompanyTypes} from '../modules/params'
import { AdminRegister} from '../modules/admin'
import { CheckListsViewInspectionCategories, ChecklistAdd } from '../modules/checklist'
import { ProtocolEvaluation, ProtocolsList} from '../modules/protocols'
import { AuditPage, AuditAdd, AuditList, AuditDetail } from '../modules/audit'

const publicRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/logout', component: <LogoutPage /> },
  { path: '/404', component: <NotFoundPage /> },
]

const privateRoutes = [
  { path: '/home', component: <HomePage /> },

  { path: '/clients', component: <ClientPage /> },
  { path: '/clients/addClient', component: <ClientAdd /> },
  { path: '/clients/listClients', component: <ClientList /> },
  { path: '/clients/clientDetail/:id', component: <ClientDetail/> },  

  { path: '/operators', component: <OperatorPage /> },
  { path: '/operators/addOperator', component: <OperatorAdd /> },
  { path: '/operators/listOperators', component: <OperatorList /> },
  { path: '/operators/operatorDetail/:operatorId', component: <OperatorDetail/> },

  { path: '/audits', component: <AuditPage /> },
  { path: '/audit/addAudit', component: <AuditAdd /> },
  { path: '/audit/listAudits', component: <AuditList /> },
  { path: '/audit/auditDetail/:auditId', component: <AuditDetail/> },

  { path: '/params', component: <CompanyTypes /> },

  { path: '/admin', component: <AdminRegister /> },

  { path: '/CheckListsViewInspectionCategories', component: <CheckListsViewInspectionCategories /> },
  { path: '/ChecklistAdd', component: <ChecklistAdd /> },

  { path: '/protocols', component: <ProtocolEvaluation /> }, 
  { path: '/protocols/:id', component: <ProtocolEvaluation /> },
  { path: '/protocols/listProtocols', component: <ProtocolsList /> },  

  
  { path: "/", component: <Navigate to="/home" /> }
]

export { publicRoutes, privateRoutes }
