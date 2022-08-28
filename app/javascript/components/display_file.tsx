import React, { useState, useEffect } from "react"
import BreadCrumb from "./bread_crumb";
import axios from "axios"

function DisplayFile() {
  const [rows, setRows] = useState([])
  const headers = rows[0]
  const body_content = rows.slice(1)

  useEffect(() => {
    axios.get("api/csv_content").then(function (response) {
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
              <th>
                <div>
                  <input type="checkbox" />
                </div>
              </th>
              {
                headers && headers.map(
                  header => <th scope="col">{header}</th>
                )
              }
            </tr>
          </thead>

          <tbody>
            { body_content.map((row, index) =>
              <tr key={index}>
                <td>
                  <div>
                    <input type="checkbox" />
                  </div>
                </td>
                {
                  row.map(value => <td>{value}</td>)
                }
              </tr>
            )}
          </tbody>
        </table>
      </BreadCrumb>
    </>
  )
}

export default DisplayFile
