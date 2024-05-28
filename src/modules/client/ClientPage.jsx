/** @format */

import React from 'react'

import useThemeStore from '../../store/themeStore'

const ClientPage = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div style={{ backgroundColor: theme.bodyBg, color: theme.textColor, padding: '20px' }}>
      <h1>Client Page</h1>
      <p>Welcome to the Home Page. This is a simple example using zustand for theme management.</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default ClientPage
