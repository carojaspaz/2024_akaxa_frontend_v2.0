/** @format */

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import useAuth from '../../../hooks/useAuth'

const Welcome = () => {
  const { t } = useTranslation()
  const { authState } = useAuth()
  return (
    <>
      <Card sx={{ minWidth: 345 }}>
        <CardMedia sx={{ height: 100 }} className="primary-class" image="/assets/images/headers/bg-1.png" title=""></CardMedia>
        <CardContent className="secondary-class">
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography sx={{padding: 1}} variant="h6" component="h6">
                  {t('home.welcome')} {authState.fullName}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <img src="/assets/images/profile-img.png" alt="" height={48} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Welcome
