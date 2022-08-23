import React, { useState, Component } from "react"
import FileUploader from "./upload_file";
import DisplayFile from "./display_file";

function SelectFile() {
  return (
    <>
      <div className="container" style={{"marginTop": "60px"}}>
        <h6>Import a file</h6>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Select a file</li>
            <li className="breadcrumb-item"><a href="#">Select column headers</a></li>
            <li className="breadcrumb-item"><a href="#">Map template columns</a></li>
            <li className="breadcrumb-item"><a href="#">Clean and finalize</a></li>
          </ol>
        </nav>
        <FileUploader />

        <DisplayFile />
      </div>
    </>
  );
}

export default SelectFile
