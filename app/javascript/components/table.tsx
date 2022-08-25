import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import { useTable } from 'react-table'

const Table = (props) => {
  const [data, setData] = useState([])
  const [headers, setHeaders] = useState([])

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
      setHeaders(headers)
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

  const table = headers.length > 0 ? (<MyTable columns={headers} data={data} />) : null

  return (
    table
  )
}

export default Table