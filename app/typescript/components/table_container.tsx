import React from 'react'
import { useTable } from 'react-table'

function TableContainer({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className='table-responsive'>
      <table {...getTableProps()} className='table table-bordered '>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              <th scope='col' className='text-center'>
                #
              </th>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className='text-center'
                  scope='col'
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, outerIndex) => {
            prepareRow(row)
            return (
              <tr key={row.id} {...row.getRowProps()}>
                <th scope='row' className='align-middle text-center'>
                  {outerIndex + 1}
                </th>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} align='center' className='align-middle text-center'>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer
