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

function OverlayToolTip(props) {
  const withOverlay = (
    <OverlayTrigger key='right' placement='right' overlay={<Tooltip>{props.message}</Tooltip>}>
      {props.children}
    </OverlayTrigger>
  )
  const withoutOverlay = <>{props.children}</>
  return <>{props?.message?.length > 0 ? withOverlay : withoutOverlay}</>
}

function CleanAndExport() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const [template, setTemplate] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [reloadValidation, setReloadValidation] = useState(false)

  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])

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

      const data = {}
      data['header_name'] = headerName
      data['value'] = newCellValue
      data['index'] = props.cell.row.index
      const url = '/api/header_column'

      const response = await axios.post(url, data, { headers: {} })
      setError(response.data.error)
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
          const headerColumns = data.headers.map((header, index) => {
            return {
              Header: () => (
                <div>
                  {header.header_name}{' '}
                  {header.total_errors > 0 ? (
                    <span className='text-danger'>({header.total_errors})</span>
                  ) : null}
                </div>
              ),
              accessor: 'col' + index,
              header_name: header.header_name,
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
        },
      },
    )
  }
  const { isFetching } = useContentAndValidation()

  useEffect(() => {
    const headerColumns = headers.map((header, index) => {
      return {
        Header: () => (
          <div>
            {header.header_name}{' '}
            {header.total_errors > 0 ? (
              <span className='text-danger'>({header.total_errors})</span>
            ) : null}
          </div>
        ),
        accessor: 'col' + index,
        header_name: header.header_name,
        Cell: renderEditable,
      }
    })
    setColumns(headerColumns)
  }, [headers])

  useEffect(() => {
    const rowData = rows.map((row) => {
      const obj = {}
      row.forEach((rowObj, index) => {
        const accessor = 'col' + index
        obj[accessor] = rowObj.value
        obj['error' + index] = rowObj.error // Error count
        obj['data_type' + index] = rowObj.data_type
      })
      return obj
    })
    setData(rowData)
  }, [rows])



  return (
    <>
      <BreadCrumb location_path='/clean-and-export'>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <ExportCsv data={data} columns={columns} csvName={template.csv_name} />
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
