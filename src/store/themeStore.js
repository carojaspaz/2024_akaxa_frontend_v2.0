/** @format */

import { create } from 'zustand'

const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fff',
    },
  },
}

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
    },
  },
}

const useThemeStore = create((set) => ({
  theme: lightTheme,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme.palette.mode === 'light' ? darkTheme : lightTheme,
    })),
}))

export default useThemeStore
