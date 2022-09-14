import React, { useEffect, useState } from "react"
import BreadCrumb from "./bread_crumb"
import axios from "axios"
import TableContainer from "./table_container";

function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  const renderEditable = (props) => {
    const [cellValue, setCellValue] = useState("")

    useEffect(() => {
      const value = props.data[props.cell.row.index][props.cell.column.id] || ""
      setCellValue(value)
    }, [props])

    const onChangeHandle = (event) => {
      if (props.data.length > 0) {
        const newCellValue = event.target.value
        props.data[props.cell.row.index][props.cell.column.id] = newCellValue
        setCellValue(newCellValue)
        setData(props.data)
      }
    }

    return (
      <input
        placeholder=""
        className="text-center"
        name="input"
        type="text"
        onChange={onChangeHandle}
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
