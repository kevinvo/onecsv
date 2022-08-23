import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function FileUploader() {
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const navigate = useNavigate()
  
  const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    const formData = new FormData()
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    )

    axios.post("/file_uploaders", formData).then(function (res) {
      setUploadSuccess(true)
      navigate("/select-column-headers")
    })
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{height: "500px"}}>
      <div>
        <input type="file" accept=".csv" onChange={handleOnFileChange} />
      </div>
      {uploadSuccess ? <div>Success!</div>  : <></>
      }
    </div>
  )
}

