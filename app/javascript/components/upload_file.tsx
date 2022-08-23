import React, { useState } from "react"

function FileUploader() {
  const [file, setFile] = useState();

  const handleOnFileChange = (e) => {
    const [f] = e.target.files;
    setFile(f);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{height: "500px"}}>
      <div>
        <input type="file" accept=".csv" onChange={handleOnFileChange} />
      </div>
    </div>
  )
}

export default FileUploader
