/** @format */

import React from "react"

import { Breadcrumbs } from "@mui/material"

import Link from "@mui/material/Link"

const CustomBreadcrumbs = ({parent, child }) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          {parent}
        </Link>
        <Link underline="hover" color="inherit" href="#">
          {child}
        </Link>
      </Breadcrumbs>
    </>
  )
}

export default CustomBreadcrumbs