/** @format */

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NonAuthLayout = ({ children }) => {
  let location = useLocation()
  const capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }
  useEffect(() => {
    let currentPage = capitalizeFirstLetter(location.pathname)
    document.title = currentPage + ' | Safety & Trust'
  }, [])

  return <React.Fragment>{children}</React.Fragment>
}


export default NonAuthLayout;