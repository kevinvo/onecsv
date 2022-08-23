import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function FileUploader() {
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleOnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files[0]
    const formData = new FormData()
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    )

    axios.post("/file_uploaders", formData).then(function(res) {
      setUploadSuccess(true)
      // const navigate = useNavigate()
      // navigate("/select-column-headers")
    }).catch(function(error) {
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

export default FileUploader
