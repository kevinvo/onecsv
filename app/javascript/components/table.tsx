import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import { useTable } from 'react-table'

const Table = (props) => {
  const [data, setData] = useState([{}])
  const [columns, setColumns] = useState([{}])

  useEffect(() => {
    if (props.rows && props.rows.length > 0) {
      const rowData = props.rows.slice(1).map(row => {
        const obj = {}
        row.forEach(function (element, index) {
          const colIndex = `col${index}`
          obj[colIndex] = element
          obj["id"] = element
        })
        return obj
      })
      console.log("rowData = " + rowData)
      setData(rowData)
    }
  }, [props.rows])

  useEffect(() => {
    if (props.rows && props.rows.length > 0) {
      const headers = props.rows[0].map((element, index) => {
        return {
          Header: element,
          accessor: `col${index}`
        }
      })
      console.log("headers = " + headers)
      setColumns(headers)
    }
  }, [props.rows])

  
  function MyTable({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    return (
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }

  console.log("headers.length = " + columns.length)
  console.log("headers = " + JSON.stringify(columns))
  console.log("data = " + JSON.stringify(data))

  const table = columns.length > 0 ? (<MyTable columns={columns} data={data} />) : null

  console.log("table = " + table)

  return (
    {table}
    // <MyTable columns={[{}]} data={[{}]} />
  )
}

export default Table