import React, { useState, Component } from 'react'
import FileUploader from '../components/upload_file'
import BreadCrumb from '../components/bread_crumb'

function SelectFile() {
  return (
    <>
      <BreadCrumb>
        <FileUploader />
      </BreadCrumb>
    </>
  )
}

export default SelectFile
