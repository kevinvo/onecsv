import React, { useEffect, useState } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios"
import TableContainer from "./table_container";

function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([{}])

  useEffect(() => {
    axios.get("api/csv_content_and_validation").then(function (response) {
      const data = response.data.data

      const headerColumns = data.headers.map((header, index) => {
        return {
          Header: header.header_name,
          accessor: 'col' + index,
        }
      })
      setColumns(headerColumns)

      const rowData = data.rows.map((row) => {
        const obj = {}
        row.forEach((value, index) => {
          const accessor = 'col' + index
          obj[accessor] = value.value
        })
        return obj
      })
      // setData(rowData)
    })
  }, [])

  console.log("columns = " + JSON.stringify(columns))
  console.log("data = " + JSON.stringify(data))

  return (
    <>
      {data.length > 0 ?
        (<BreadCrumb>
          <TableContainer columns={columns} data={data} />
        </BreadCrumb>) : null}
    </>
  )
}

export default CleanAndFinalize
