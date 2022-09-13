import React, { useEffect, useState } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios"
import TableContainer from "./table_container";

function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  const renderEditable = (props) => {
    // const cellValue = data[row.index][row.column.id]
    const cellValue = props.cell.value
    return (
      <input
        placeholder=""
        name="input"
        type="text"
        // onChange={}
        defaultValue=""
        value={cellValue}
      />
    )
  }

  useEffect(() => {
    axios.get("api/csv_content_and_validation").then(function (response) {
      const data = response.data.data

      const headerColumns = data.headers.map((header, index) => {
        return {
          Header: header.header_name,
          accessor: 'col' + index,
          Cell: renderEditable,
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
      setData(rowData)
    })
  }, [])

  return (
    <>
      {columns.length > 0 && data.length > 0 ?
        (<BreadCrumb>
          <TableContainer columns={columns} data={data} />
        </BreadCrumb>) : null}
    </>
  )
}

export default CleanAndFinalize
