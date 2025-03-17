/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@mui/material'


import { CustomBreadcrumbs } from '../../components/common'
import Welcome from './components/Welcome'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Container>
        <CustomBreadcrumbs parent={'Safety & Trust'} child={t('layout.home')} />
        <Welcome />
      </Container>
    </div>
  )
}

export default HomePage
