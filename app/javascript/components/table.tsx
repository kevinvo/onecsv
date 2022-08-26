import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import DataGrid, {SelectColumn, textEditor} from 'react-data-grid'

const Table = (props) => {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    if (props.rows && props.rows.length > 0) {
      const rowData = props.rows.slice(1).map(row => {
        const obj = {}
        row.forEach(function (element, index) {
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
          // name: "",
          key: `col${index}`,
          resizable: true,
          editor: textEditor,
        }
      })
      setColumns(headers)
    }
  }, [props.rows])

  return (
    columns.length > 0 ?
      (<DataGrid columns={columns}
                 rows={rows}
                 className="fill-grid rdg-light"
                 hoverStateEnabled={true}
                 // components={{checkboxFormatter: CheckboxFormatter}},
                 rowKeyGetter={(row) => row.id}
                 defaultColumnOptions={{resizable: true}} />) : null
  )
}

export default Table