import React, { useState, Component } from 'react'
import FileUploader from './upload_file'
import BreadCrumb from './bread_crumb'

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
