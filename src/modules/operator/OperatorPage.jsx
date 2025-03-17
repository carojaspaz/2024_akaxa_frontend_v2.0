/** @format */

import React from 'react'
import useThemeStore from '../../store/themeStore'
import OperatorList from './OperatorList'

const OperatorPage = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (        
    <OperatorList title='Lista de operadores' />
  )
}

export default OperatorPage
