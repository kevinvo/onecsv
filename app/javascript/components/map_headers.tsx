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
	            <th scope="col">#</th>
	            <th scope="col">CSV Column</th>
	            <th scope="col">Sample Rows</th>
	            <th scope="col">Template Column</th>
	            <th scope="col">Required Field</th>
	          </tr>
          </thead>

          <tbody>
            { headers.map((header, index) =>
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{header.header_name}</td>
                <td align="center">
                </td>

                <td align="center">
                    <select id={`data-type-${index}`} name={`data-type-${index}`}>
                      {headerDataTypes.map((data_type) =>
                        <option value={`${data_type}`}>{data_type}</option>
                      )}
                    </select>
                </td>

                <td>
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
