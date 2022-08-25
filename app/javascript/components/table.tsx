import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import DataGrid from 'react-data-grid';

const Table = (props) => {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    if (props.rows && props.rows.length > 0) {
      const rowData = props.rows.slice(1).map(row => {
        const obj = {}
        row.forEach(function (element, index) {
          // console.log("element = " + element)
          obj[`col${index}`] = element
          obj["id"] = Math.random().toString(36)
        })
        return obj
      })
      setRows(rowData)
    }
  }, [props.rows])

  useEffect(() => {
    if (props.rows && props.rows.length > 0) {
      const headers = props.rows[0].map((element, index) => {
        return {
          name: element,
          key: `col${index}`
        }
      })
      setColumns(headers)
    }
  }, [props.rows])

  interface Row {
    id: number
  }

  function rowKeyGetter(row: Row) {
    return row.id;
  }

  return (
    columns.length > 0 ?
      (<DataGrid columns={columns}
                 rows={rows}
                 className="fill-grid rdg-light"
                 hoverStateEnabled={true}
                 editable={true}
                 rowKeyGetter={rowKeyGetter}
                 defaultColumnOptions={{resizable: true}} />) : null
  )
}

export default Table