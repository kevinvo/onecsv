import React, { useState, useEffect } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios";

function MapHeaders() {
	const [headers, setHeaders] = useState([])
  const [headerDataTypes, setHeaderDataTypes] = useState([])

  useEffect(() => {
    axios.get("api/csv_header").then(function (response) {
      const data = response.data.data
      setHeaders(data.headers)
      setHeaderDataTypes(data.data_types)
    })
  }, [])

	return (
		<>
      <BreadCrumb>
        <table className="table table-bordered table-fit">
          <thead>
            <tr>
	            <th scope="col"></th>
	            <th class="text-center" scope="col">CSV Column</th>
	            <th class="text-center" scope="col">Sample Rows</th>
	            <th class="text-center" scope="col">Template Column</th>
	            <th class="text-center" scope="col">Required Field</th>
	          </tr>
          </thead>

          <tbody>
            { headers.map((header, index) =>
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td align="center">{header.header_name}</td>
                <td align="center">
                  <ul className="list-group">
                  {header.sample_values.map((value) => <li className="list-group-item border-0">{value}</li>)}
                  </ul>
                </td>

                <td align="center">
                    <select value={header.data_type} id={`data-type-${index}`} name={`data-type-${index}`} class="form-select" aria-label="Select template column type">
                      <option value="-1">Select</option>
                      {headerDataTypes.map((data_type) =>
                        <option value={`${data_type}`}>{data_type}</option>
                      )}
                    </select>
                </td>

                <td align="center">
                	<div align="center">
	                  <input type="checkbox" />
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

export default MapHeaders
