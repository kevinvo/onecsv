import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SelectFile from './pages/select_file'
import MapTemplateColumn from './pages/map_template_column'
import CleanAndExport from './pages/clean_and_export'
import { hotjar } from 'react-hotjar'
import ReactGA from 'react-ga'

const TRACKING_ID = 'UA-243778211-1'

export default function App() {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    hotjar.initialize(3181232, 6)
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SelectFile />} />
        <Route path='/map-template-columns' element={<MapTemplateColumn />} />
        <Route path='/clean-and-finalize' element={<CleanAndExport />} />
      </Routes>
    </div>
  )
}
