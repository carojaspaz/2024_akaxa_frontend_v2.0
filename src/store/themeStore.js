/** @format */

import { create } from 'zustand'

const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#556ee6',
    },
    secondary: {
      main: '#c3cbe4',
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
      main: '#141f35',
    },
    secondary: {
      main: '#c3cbe4',
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
