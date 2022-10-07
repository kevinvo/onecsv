import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FileUploader() {
  const navigate = useNavigate()

  async function handleOnFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files[0]
    const formData = new FormData()
    formData.append('file', selectedFile, selectedFile.name)

    await axios.post('api/file_uploaders', formData)
    navigate('/map-template-columns')
  }

  return (
    <div
      className='d-flex flex-row justify-content-center align-items-center'
      style={{ height: '500px' }}
    >
      <div>
        <input type='file' accept='.csv' onChange={handleOnFileChange} />
      </div>
    </div>
  )
}
