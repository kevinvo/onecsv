import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/bread_crumb'
import axios from 'axios'
import TableContainer from '../components/table_container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { CellDataType } from '../components/types'
import ExportCsv from '../components/export_csv'
import { DebounceInput } from 'react-debounce-input'
import AutohideToast from '../components/auto_hide_toast'
import LoadingSpinner from '../components/loading_spinner'
import { useQuery } from '@tanstack/react-query'
import { useHeaderStore } from '../store'
import styled from 'styled-components'

const Circle = styled.span`
  display: inline-block;
  line-height: 0px;
  border-radius: 50%;
  border: 2px solid;
  font-size: 14px;
`
const ErrorCount = styled.span`
  display: inline-block;
  padding-top: 50%;
  padding-bottom: 50%;
  margin-left: 8px;
  margin-right: 8px;
`
const NoWrapText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  min-width: 1px;
`
type OverlayProps = {
  message: string
  children: JSX.Element
}

function OverlayToolTip({ children, message }: OverlayProps) {
  const withOverlay = (
    <OverlayTrigger key='right' placement='right' overlay={<Tooltip>{message}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
  const withoutOverlay = <>{children}</>
  return <>{message?.length > 0 ? withOverlay : withoutOverlay}</>
}

function CleanAndExport() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const [template, setTemplate] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const replaceHeader = useHeaderStore((state) => state.replaceHeader)
  const setHeaders = useHeaderStore((state) => state.setHeaders)

  useEffect(() => {
    document.title = 'Clean and Export'
  })

  const renderEditable = (props) => {
    const [cellValue, setCellValue] = useState('')
    const [error, setError] = useState('')
    const [dataType, setDataType] = useState(CellDataType.Text)

    useEffect(() => {
      const index = props.cell.row.index
      const dataObj = props.data[index]
      const value = dataObj[props.cell.column.id] || ''

      const errorIdx = props.cell.column.id.replace('col', 'error')
      const error = dataObj[errorIdx] || ''
      const dataTypeIndex = props.cell.column.id.replace('col', 'data_type')
      const cellDataType = dataObj[dataTypeIndex]

      setError(error)
      setCellValue(value)
      setDataType(cellDataType)
    }, [props.data])

    async function onChangeHandle(event) {
      const columnId = props.cell.column.id
      const newCellValue = event.target.value
      props.data[props.cell.row.index][columnId] = newCellValue
      const headerName = props.headers.find((header) => {
        return header.id === columnId
      }).header_name
      setCellValue(newCellValue)

      const postData = {}
      postData['header_name'] = headerName
      postData['value'] = newCellValue
      postData['index'] = props.cell.row.index
      const { data } = await axios.post('/api/header_column', postData, { headers: {} })
      setError(data.error)
      replaceHeader(data.header)
      setShowToast(true)
    }

    const className = 'text-center ' + (error ? 'border border-danger' : '')
    const input = (
      <DebounceInput
        placeholder=''
        className={className}
        name='input'
        maxLength={20}
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

  function renderHeader(header) {
    const headers = useHeaderStore((state) => state.headers)
    const foundHeader = headers.find((element) => {
      return element.position === header.position
    })

    return (
      <div>
        <NoWrapText>
          <span>{foundHeader.header_name} </span>

          {foundHeader.total_errors > 0 ? (
            <span className='text-danger'>
              <Circle>
                <ErrorCount>{foundHeader.total_errors}</ErrorCount>
              </Circle>
            </span>
          ) : null}
        </NoWrapText>
      </div>
    )
  }

  function handleHeaders(headers) {
    const headerColumns = headers.map((header, index) => {
      return {
        Header: () => renderHeader(header),
        accessor: 'col' + index,
        header_name: header.header_name,
        Cell: renderEditable,
      }
    })
    setColumns(headerColumns)
  }

  function handleRows(rows) {
    const rowData = rows.map((row) => {
      const obj = {}
      row.forEach((rowObj, index) => {
        // The data being set here will be accessed inside method renderEditable.
        const accessor = 'col' + index
        obj[accessor] = rowObj.value
        obj['error' + index] = rowObj.error // error message
        obj['data_type' + index] = rowObj.data_type
      })
      return obj
    })
    setData(rowData)
  }

  function useContentAndValidation() {
    return useQuery(
      ['content_and_validation'],
      async () => {
        const { data } = await axios.get('api/content_and_validation')
        return data
      },
      {
        onSuccess: (data) => {
          setTemplate(data.template)
          handleHeaders(data.headers)
          handleRows(data.rows)
          setHeaders(data.headers)
        },
      },
    )
  }
  const { isFetching } = useContentAndValidation()

  return (
    <>
      <BreadCrumb locationPath='/clean-and-export'>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <ExportCsv data={data} columns={columns} csvName={template?.csv_name} />
            <TableContainer columns={columns} data={data} />
            <AutohideToast
              showToast={showToast}
              setShowToast={setShowToast}
              message='Successfully Saved!'
            />
          </>
        )}
      </BreadCrumb>
    </>
  )
}

export default CleanAndExport
