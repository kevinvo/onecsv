import create from 'zustand'

export const useHeaderStore = create((set, get) => ({
  headers: [],
  setHeaders: (headers) => {
    set((state) => ({ headers: headers }))
  },
  replaceHeader: (header) => {
    set((state) => ({
      headers: state.headers.map((prevHeader, index) =>
        prevHeader.position === header.position ? header : prevHeader,
      ),
    }))
  },
}))
