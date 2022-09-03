import React, { useEffect, useState, Component } from "react"
import BreadCrumb from "./bread_crumb"
import DataGrid, {textEditor, CheckboxFormatterProps, RowRendererProps, SelectColumn} from 'react-data-grid'
import axios from "axios"

function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios.get("api/csv_content_and_validation").then(function (response) {
      const data = response.data.data

      const cols = data.headers.map(function (obj, index) {
        return {
          name: obj.header_name,
          key: `col${index}`,
          resizable: true,
          width: 100,
          frozen: true,
          editor: textEditor,
          formatter: ({ row }) => <div className="align-middle text-center"> {row[`col${index}`]} </div> //cell formatter
        }
      })
      setColumns(cols)

      const cleanRows = data.rows.map(function (row) {
        const obj = {}
        row.forEach(function (object, index) {
          const value = object.value
          obj[`col${index}`] = value
          obj["id"] = value
        })
        return obj
      })
      setRows(cleanRows)
    })
  }, [])

  return (
    <>
      <BreadCrumb>
        <DataGrid className="rdg-light fill-grid"
                  columns={columns}
                  rows={rows}
        />
      </BreadCrumb>
    </>
  )
}

export default CleanAndFinalize
