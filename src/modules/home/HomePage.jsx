/** @format */

import React from 'react'

import { useTranslation } from 'react-i18next'

import { Card, Container } from '@mui/material'

import { CustomBreadcrumbs } from '../../components/common'


const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-content">
          <Container>
            <CustomBreadcrumbs parent={'Safety & Trust'} child={t('layout.home')} />

            <Card className="bg-soft-secondary">
              
            </Card>
          </Container>
        </div>
  )
}

export default HomePage
