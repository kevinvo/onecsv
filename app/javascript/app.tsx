import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import SelectFile from "./components/select_file";
import DisplayFile from "./components/display_file";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SelectFile />} />
        <Route path="/select-column-headers" element={<DisplayFile />} />
      </Routes>
    </div>
  )

}