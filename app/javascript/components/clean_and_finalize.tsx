import React, { useState, Component } from "react"
import FileUploader from "./upload_file"
import BreadCrumb from "./bread_crumb"

function CleanAndFinalize() {
  return (
    <>
      <BreadCrumb>
        <FileUploader />
      </BreadCrumb>
    </>
  );
}

export default CleanAndFinalize
