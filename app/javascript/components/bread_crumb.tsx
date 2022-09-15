import React from 'react'

export default function BreadCrumb(props) {
  return (
    <>
      <div className='container' style={{ marginTop: '60px' }}>
        <div className='d-flex justify-content-between'>
          <div>Import a file</div>
        </div>

        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item active' aria-current='page'>
              <a href='/'>Select a file</a>
            </li>
            <li className='breadcrumb-item'>
              <a href='/map-template-columns'>Map template columns</a>
            </li>
            <li className='breadcrumb-item'>
              <a href='/clean-and-finalize'>Clean and finalize</a>
            </li>
          </ol>
        </nav>
        {props.children}
      </div>
    </>
  )
}
