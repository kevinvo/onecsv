import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios";

function MapHeaders() {

  useEffect(() => {
    axios.get("api/csv_header").then(function (response) {
      const data = response.data.data
    })
  }, [])


	return (
		<>
			<BreadCrumb>
        <table className="table">
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <input type="checkbox"></input>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <input type="checkbox"></input>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>
              <input type="checkbox"></input>
            </td>
          </tr>
          </tbody>
        </table>
			</BreadCrumb>
		</>
  )
}

export default MapHeaders
