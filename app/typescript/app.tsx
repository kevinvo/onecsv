import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SelectFile from './pages/select_file'
import MapTemplateColumn from './pages/map_template_column'
import CleanAndExport from './pages/clean_and_export'
import { hotjar } from 'react-hotjar'
import ReactGA from 'react-ga'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TRACKING_ID = 'UA-243778211-1'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
export default function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    hotjar.initialize(3242383, 6)
  }, [])

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<SelectFile />} />
          <Route path='/map-template-columns' element={<MapTemplateColumn />} />
          <Route path='/clean-and-export' element={<CleanAndExport />} />
        </Routes>
      </QueryClientProvider>
    </div>
  )
}
