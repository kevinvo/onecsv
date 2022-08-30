import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import SelectFile from "./components/select_file";
import DisplayFile from "./components/display_file";
import MapHeaders from "./components/map_headers";
import CleanAndFinalize from "./components/clean_and_finalize";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SelectFile />} />
        <Route path="/select-column-headers" element={<DisplayFile />} />
        <Route path="/map-headers" element={<MapHeaders />} />
        <Route path="/clean-and-finalize" element={<CleanAndFinalize />} />
      </Routes>
    </div>
  )

}
