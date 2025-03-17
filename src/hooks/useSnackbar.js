/** @format */

import { useState } from 'react'

const useSnackbar = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const showSnackbar = (msg) => {
    setMessage(msg)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return {
    open,
    message,
    showSnackbar,
    handleClose,
  }
}

export default useSnackbar
