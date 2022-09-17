import React from 'react'
import * as XLSX from 'xlsx/xlsx.mjs'
import Button from "react-bootstrap/Button"

function ExportCsv({ columns, data }) {

  const exportFile = (event) => {

    const accessorHeaderNameHash = columns.reduce(function(result, obj) {
      result[obj['accessor']] = obj['Header']
      return result
    }, {})

    const rows = []
    data.forEach((row) => {
      const rowHash = {}
      for (let index = 0; index < Object.keys(columns).length; ++index) {
        const accessor = 'col' + index
        const value = row[accessor]
        const headerName = accessorHeaderNameHash[accessor]
        rowHash[headerName] = value
      }
      rows.push(rowHash)
    })

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SheetJS')
    XLSX.writeFile(workbook, 'csvfile.csv')
  }

  return (
    <>
      <div className='d-flex py-2 justify-content-end'>
        <Button type='button' className='btn btn-md btn-primary' onClick={exportFile}>
          Export CSV
        </Button>
      </div>
    </>
  )
}

export default ExportCsv
