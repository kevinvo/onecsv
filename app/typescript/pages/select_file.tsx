import React, { useState, useEffect } from 'react'
import FileUploader from '../components/upload_file'
import BreadCrumb from '../components/bread_crumb'

function SelectFile() {

  useEffect(() => {
    document.title = 'Import a File'
  })

  return (
    <>
      <BreadCrumb location_path='/'>
        <FileUploader />
      </BreadCrumb>
    </>
  )
}

export default SelectFile
