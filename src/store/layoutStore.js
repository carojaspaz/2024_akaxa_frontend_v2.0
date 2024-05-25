/** @format */

import { create } from 'zustand'

const layouts = {
    NonAuthLayout: "NonAuthLayout",
    VerticalLayout: "VerticalLayout",
    HorizontalLayout: "HorizontalLayout",
}

const useLayoutStore = create((set) => ({
  layout: layouts.NonAuthLayout,
  setLayout: (newLayout) => set({ layout: newLayout }),
  layouts
}))

export default useLayoutStore;
