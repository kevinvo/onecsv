import React, { useState, Component } from "react"
import axios from 'axios';

function FileUploader() {

  const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    const formData = new FormData()
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    )
    axios.post("file_uploaders", formData)
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{height: "500px"}}>
      <div>
        <input type="file" accept=".csv" onChange={handleOnFileChange} />
      </div>
    </div>
  )
}

export default FileUploader