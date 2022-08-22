import React, { useState, Component } from "react"
import axios from 'axios';


function FileUploader() {
// class FileUploader extends Component {
  const [selectedFile, setSelectedFile] = useState(null)

  const onFileChange = event => {
    setSelectedFile(event.target.files[0])
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    axios.post("api/uploadfile", formData);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center" style={{height: "500px"}}>
      <div>
        <input type="file" onChange={this.onFileChange} />
      </div>
      {fileData()}
    </div>
  );
}

export default FileUploader