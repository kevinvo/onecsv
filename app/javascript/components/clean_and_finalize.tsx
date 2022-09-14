import React, { useEffect, useState } from 'react'
import BreadCrumb from './bread_crumb'
import axios from 'axios'
import TableContainer from './table_container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function OverlayToolTip(props) {
  return (
    <>
      <OverlayTrigger key='right' placement='right' overlay={<Tooltip>{props.message}</Tooltip>}>
        {props.children}
      </OverlayTrigger>
    </>
  )
}
function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  const renderEditable = (props) => {
    const [cellValue, setCellValue] = useState('')
    const [error, setError] = useState('')
    const [warning, setWarning] = useState('')

    useEffect(() => {
      const value = props.data[props.cell.row.index][props.cell.column.id] || ''
      const warning = props.data[props.cell.row.index]['warning' + props.cell.row.index] || ''
      const error = props.data[props.cell.row.index]['error' + props.cell.row.index] || ''

      setError(error)
      setWarning(warning)
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
      <OverlayToolTip message={error}>
        <input
          placeholder=''
          className={'text-center ' + (error ? 'border border-danger' : '')}
          name='input'
          type='text'
          onChange={onChangeHandle}
          value={cellValue}
        />
      </OverlayToolTip>
    )
  }

  useEffect(() => {
    axios.get('api/csv_content_and_validation').then(function (response) {
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
        row.forEach((rowObj, index) => {
          const accessor = 'col' + index
          obj[accessor] = rowObj.value
          obj['error' + index] = rowObj.error
          obj['warning' + index] = rowObj.warning
        })
        return obj
      })
      setData(rowData)
    })
  }, [])

  return (
    <>
      {columns.length > 0 && data.length > 0 ? (
        <BreadCrumb>
          <TableContainer columns={columns} data={data} />
        </BreadCrumb>
      ) : null}
    </>
  )
}

export default CleanAndFinalize
