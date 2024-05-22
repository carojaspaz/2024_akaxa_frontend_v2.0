/** @format */

import React from 'react'
import { useThemeStore } from '../../store/themeStore'

const HomePage = () => {
  const { theme } = useThemeStore()

  return (
    <div style={{ backgroundColor: theme.bodyBg, color: theme.textColor, padding: '20px' }}>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page. This is a simple example using zustand for theme management.</p>
    </div>
  )
}

export default HomePage
