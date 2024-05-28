/** @format */

import React from 'react'

const AppRoutePublic = ({ layout: Layout, component: Component, ...rest }) => {
  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  )
}

export default AppRoutePublic
