/** @format */

import { create } from 'zustand'

const lightTheme = {
  bodyBg: '#fff',
  textColor: '#000',
}

const darkTheme = {
  bodyBg: '#000',
  textColor: '#fff',
}

const useThemeStore = create((set) => ({
  theme: lightTheme,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === lightTheme ? darkTheme : lightTheme,
    })),
}))

export { useThemeStore, lightTheme, darkTheme }
