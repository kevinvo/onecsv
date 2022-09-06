import React, { useState, useEffect } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios";
import {CellDataType} from "./types"

function MapTemplateColumn() {
	const [headers, setHeaders] = useState([])

  useEffect(() => {
    axios.get("api/csv_header").then(function (response) {
      const data = response.data.data
      setHeaders(data.headers)
    })
  }, [])

  function onRequiredChanged(event, index) {
    const newHeaders = [...headers]
    newHeaders[index].required = !headers[index].required
    setHeaders(newHeaders)
  }

  function onSelectChanged(event, index) {
    const newHeaders = [...headers]
    newHeaders[index].data_type = event.target.value
    setHeaders(newHeaders)
  }

  function onSave() {
    const data = {
      csv_headers: headers
    }

    axios.post('/api/csv_header', data)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })

  }

	return (
		<>
      <BreadCrumb>
        <div className="d-flex py-2 justify-content-end">
          <button type="button" className="btn btn-md btn-primary" onClick={() => onSave()}>
            Save & Continue
          </button>
        </div>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
	            <th scope="col"></th>
	            <th className="text-center" scope="col">Header Column</th>
	            <th className="text-center" scope="col">Sample Rows</th>
	            <th className="text-center" scope="col">Template Column</th>
	            <th className="text-center" scope="col">Required</th>
	          </tr>
          </thead>

          <tbody>
            {headers.map((header, index) =>
              <tr key={index}>
                <th scope="row" className="align-middle text-center">{index + 1}</th>
                <td align="center" className="align-middle text-center">{header.header_name}</td>
                <td align="center" className="align-middle text-center">
                  <ul className="list-group">
                  {header.sample_values.map((value, index) => <li key={index} className="list-group-item border-0">{value}</li>)}
                  </ul>
                </td>

                <td align="center" className="align-middle text-center">
                    <select value={header.data_type as CellDataType}
                            id={`data-type-${index}`}
                            name={`data-type-${index}`}
                            className="form-select"
                            onChange={(event) => onSelectChanged(event, index)}
                            aria-label="Select template column type">
                      <option value="-1">Select</option>
                      {Object.keys(CellDataType).map((key) => isNaN(Number(key)) ? key : null).filter(item => item).map((key, index) =>
                        <option key={index} data-value={key} value={`${CellDataType[key]}`}>{CellDataType[CellDataType[key]]}</option>
                      )}
                    </select>
                </td>

                <td align="center" className="align-middle text-center">
                	<div>
	                  <input type="checkbox"
                           checked={header.required}
                           onChange={(event) => onRequiredChanged(event, index)} />
	                </div>
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </BreadCrumb>
		</>
  )
}

export default MapTemplateColumn
