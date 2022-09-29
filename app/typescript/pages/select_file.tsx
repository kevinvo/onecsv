import React from 'react'
import FileUploader from '../components/upload_file'
import BreadCrumb from '../components/bread_crumb'

function SelectFile() {
  return (
    <>
      <BreadCrumb location_path="/">
        <FileUploader />
      </BreadCrumb>
    </>
  )
}

export default SelectFile
