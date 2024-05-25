/** @format */

import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Footer = (props) => {
  return (
    <React.Fragment>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.safetyntrust.com/">
          Safety & Trust
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </React.Fragment>
  )
}

export default Footer
