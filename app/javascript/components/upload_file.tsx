import React, { useState, Component } from "react"
import axios from 'axios';

function FileUploader() {
  const onFileUpload = (event) => {
    const file = event.target.files[0]
    const formData = new FormData();
    formData.append(
      "myFile",
      file,
      file.name
    );
    axios.post("/api/upload_file", formData);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{height: "500px"}}>
      <div>
        <input type="file" accept=".csv" onChange={onFileUpload} />
      </div>
    </div>
  );
}

export default FileUploader