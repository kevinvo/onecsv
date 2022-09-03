import React, { useEffect, useState, Component } from "react"
import BreadCrumb from "./bread_crumb"
import DataGrid, {checkboxFormatter, CheckboxFormatterProps, RowRendererProps, SelectColumn} from 'react-data-grid'
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
          key: `col${index}`
        }
      })
      setColumns(cols)

      const cleanRows = data.rows.map(function (values) {
        const obj = {}
        values.forEach(function (value, index) {
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
        <Table columns={columns} rows={rows}/>
      </BreadCrumb>
    </>
  )
}

function Table(props) {
  return (
    <DataGrid className="rdg-light fill-grid"
              rowHeight={30}
              columns={props.columns}
              rows={props.rows}
    />
  )
}
export default CleanAndFinalize
