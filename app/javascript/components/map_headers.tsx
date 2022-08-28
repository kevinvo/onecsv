import React, { useState, useEffect } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios";

function MapHeaders() {
	const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get("api/csv_header").then(function (response) {
      const data = response.data.data
      setRows(data)
    })
  }, [])

	return (
		<>
      <BreadCrumb>
        <table className="table table-bordered">
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
            { rows.map((row, index) =>
              <tr key={index}>
              	<td></td>
                <td>{row.value}</td>
                <td></td>
                <td></td>
                <td>
                	<div>
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
