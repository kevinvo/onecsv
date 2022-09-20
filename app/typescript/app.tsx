import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SelectFile from './components/select_file'
import MapTemplateColumn from './components/map_template_column'
import CleanAndFinalize from './components/clean_and_finalize'

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SelectFile />} />
        <Route path='/map-template-columns' element={<MapTemplateColumn />} />
        <Route path='/clean-and-finalize' element={<CleanAndFinalize />} />
      </Routes>
    </div>
  )
}
