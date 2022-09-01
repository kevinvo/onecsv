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

      const cols = data.map(function (obj, index) {
        return {
          name: obj.header_name,
          key: `col${index}`
        }
      })
      console.log("cols = " + JSON.stringify(cols))
      setColumns(cols)

      const refreshRows = data.map(function (obj) {
        const newObj = {}
        obj.values.forEach(function (value, index) {
          newObj[`col${index}`] = value
          obj["id"] = value
        })
        return newObj
      })
      // console.log("refreshRows = " + JSON.stringify(refreshRows))

      setRows(refreshRows)
    })
  }, [])

  // const columns = [
  //   {key: 'id', name: 'ID'},
  //   {key: 'title', name: 'Title'},
  //   {key: 'title1', name: 'Title1'}
  // ]
  //
  // const rows = [
  //   {id: 0, title: 'Example', title1: "Example1"},
  //   {id: 1, title: 'Demo', title1: "Demo1"}
  // ]

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
