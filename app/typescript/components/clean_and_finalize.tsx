import React, { useEffect, useState } from 'react'
import BreadCrumb from './bread_crumb'
import axios from 'axios'
import TableContainer from './table_container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { CellDataType } from "./types"

function OverlayToolTip(props) {
  const withOverlay = (<OverlayTrigger
                          key='right'
                          placement='right'
                          overlay={<Tooltip>{props.message}</Tooltip>}>
                          {props.children}
                        </OverlayTrigger>)

  const withoutOverlay = (<>{props.children}</>)

  return (
    <>
      {props?.message?.length > 0 ? withOverlay : withoutOverlay}
    </>
  )
}
function CleanAndFinalize() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  const renderEditable = (props) => {
    const [cellValue, setCellValue] = useState('')
    const [error, setError] = useState('')
    const [dataType, setDataType] = useState(CellDataType.Text)

    useEffect(() => {
      const index = props.cell.row.index
      const dataObj = props.data[index]
      const value = dataObj[props.cell.column.id] || ''

      const errorIndex = props.cell.column.id.replace('col', 'error')
      const error = dataObj[errorIndex] || ''
      const dataTypeIndex = props.cell.column.id.replace('col', 'data_type')
      const cellDataType = dataObj[dataTypeIndex]

      setError(error)
      setCellValue(value)
      setDataType(cellDataType)
    }, [props.data])

    const onChangeHandle = (event) => {
      if (props.data.length > 0) {
        const newCellValue = event.target.value
        props.data[props.cell.row.index][props.cell.column.id] = newCellValue
        setCellValue(newCellValue)
        setData(props.data)
      }
    }

    const className = 'text-center ' + (error ? 'border border-danger' : '')

    const input = (<input
      placeholder=''
      className={className}
      name='input'
      type='text'
      onChange={onChangeHandle}
      value={cellValue}
    />)

    const textArea = (<textarea
      placeholder=''
      className={className}
      name='text-area'
      onChange={onChangeHandle}
      value={cellValue}
    />)

    return (
      <OverlayToolTip message={error}>
        {(dataType === CellDataType.Text) ? textArea : input}
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
          obj['data_type' + index] = rowObj.data_type
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
