import React, { useState, useEffect } from 'react'
import BreadCrumb from '../components/bread_crumb'
import axios from 'axios'
import { CellDataType } from '../components/types'
import TemplateModal from '../components/template_modal'
import LoadingSpinner from '../components/loading_spinner'
import { TemplateIndexType } from '../api_types'
import { CSVHeaders, Template } from '../types'
import { useQuery } from '@tanstack/react-query'

function MapTemplateColumn() {
  const [headers, setHeaders] = useState<CSVHeaders>([])
  const [currentTemplate, setCurrentTemplate] = useState<Template>()

  useEffect(() => {
    document.title = 'Map Template Columns'
  })

  function useTemplate() {
    return useQuery(
      ['template'],
      async () => {
        const { data } = await axios.get('api/template')
        return data
      },
      {
        onSuccess: (data) => {
          setHeaders(data.headers)
          setCurrentTemplate(data.current_template)
        },
      },
    )
  }

  function onRequiredChanged(event, index) {
    const newHeaders = [...headers]
    newHeaders[index].required = !headers[index].required
    setHeaders(newHeaders)
  }

  function onSelectChanged(event, index) {
    const newHeaders = [...headers]
    newHeaders[index].data_type = event.target.value
    setHeaders(newHeaders)
  }

  const { isFetching } = useTemplate()

  return (
    <>
      <BreadCrumb locationPath='/map-template-columns'>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='d-flex py-2 justify-content-end'>
              <TemplateModal headers={headers} currentTemplate={currentTemplate} />
            </div>
            <table className='table table-bordered table-sm'>
              <thead>
                <tr>
                  <th scope='col'></th>
                  <th className='text-center' scope='col'>
                    Header Column
                  </th>
                  <th className='text-center' scope='col'>
                    Sample Rows
                  </th>
                  <th className='text-center' scope='col'>
                    Template Column
                  </th>
                  <th className='text-center' scope='col'>
                    Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {headers.map((header, index) => (
                  <tr key={index}>
                    <th scope='row' className='align-middle text-center'>
                      {index + 1}
                    </th>
                    <td align='center' className='align-middle text-center'>
                      {header.header_name}
                    </td>
                    <td align='center' className='align-middle text-center'>
                      <ul className='list-group'>
                        {header.sample_values.map((value, index) => (
                          <li key={index} className='list-group-item border-0'>
                            {value}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td align='center' className='align-middle text-center'>
                      <select
                        value={header.data_type as CellDataType}
                        id={`data-type-${index}`}
                        name={`data-type-${index}`}
                        className='form-select'
                        onChange={(event) => onSelectChanged(event, index)}
                        aria-label='Select template column type'
                      >
                        <option value='-1'>Select</option>
                        {Object.keys(CellDataType)
                          .map((key) => (isNaN(Number(key)) ? key : null))
                          .filter((item) => item)
                          .map((key, index) => (
                            <option key={index} data-value={key} value={`${CellDataType[key]}`}>
                              {CellDataType[CellDataType[key]]}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td align='center' className='align-middle text-center'>
                      <div>
                        <input
                          type='checkbox'
                          checked={header.required}
                          onChange={(event) => onRequiredChanged(event, index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </BreadCrumb>
    </>
  )
}

export default MapTemplateColumn
