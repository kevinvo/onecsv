import React, { useEffect, useState } from 'react'
import BreadCrumb from './bread_crumb'
import axios from 'axios'
import TableContainer from './table_container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { CellDataType } from './types'
import ExportCsv from './export_csv'
import { DebounceInput } from 'react-debounce-input'

function OverlayToolTip(props) {
  const withOverlay = (
    <OverlayTrigger key='right' placement='right' overlay={<Tooltip>{props.message}</Tooltip>}>
      {props.children}
    </OverlayTrigger>
  )
  const withoutOverlay = <>{props.children}</>
  return <>{props?.message?.length > 0 ? withOverlay : withoutOverlay}</>
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
      const columnId = props.cell.column.id
      const newCellValue = event.target.value
      props.data[props.cell.row.index][columnId] = newCellValue
      const headerName = props.headers.find((header) => {
        return header.id === columnId
      }).Header
      setCellValue(newCellValue)
      setData(props.data)


      const data = {}
      data['header_name'] = headerName
      data['value'] = newCellValue
      data['index'] = props.cell.row.index
      const url = 'api/csv_content'

      axios.post(url, data, {headers: {}}).
        then(res => {
          console.log('success')
        }).catch(err => {
          console.log('error')
        })

    }


    const className = 'text-center ' + (error ? 'border border-danger' : '')
    const input = (
      <DebounceInput
        placeholder=''
        className={className}
        name='input'
        debounceTimeout={500}
        onChange={onChangeHandle}
        value={cellValue}
      />
    )
    const textArea = (
      <DebounceInput
        placeholder=''
        className={className}
        name='text-area'
        element='textarea'
        debounceTimeout={500}
        onChange={onChangeHandle}
        value={cellValue}
      />
    )

    return (
      <OverlayToolTip message={error}>
        {dataType === CellDataType.Text ? textArea : input}
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
      <BreadCrumb>
        {columns.length > 0 && data.length > 0 ?
          (<>
            <ExportCsv data={data} columns={columns} />
            <TableContainer columns={columns} data={data} />
            </>
          ) : null}
        </BreadCrumb>

    </>
  )
}

export default CleanAndFinalize
