import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import SelectFile from "./components/select_file"
import SelectColumnHeader from "./components/select_column_headers"
import MapTemplateColumn from "./components/map_template_column"
import CleanAndFinalize from "./components/clean_and_finalize"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SelectFile />} />
        <Route path="/select-column-headers" element={<SelectColumnHeader />} />
        <Route path="/map-template-columns" element={<MapTemplateColumn />} />
        <Route path="/clean-and-finalize" element={<CleanAndFinalize />} />
      </Routes>
    </div>
  )

}
