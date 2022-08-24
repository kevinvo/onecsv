import React from 'react'

export default function BreadCrumb(props) {
  return (
    <>
      <div className="container" style={{"marginTop": "60px"}}>
        <h6>Import a file</h6>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page"><a href="/">Select a file</a></li>
            <li className="breadcrumb-item"><a href="/select-column-headers">Select column headers</a></li>
            <li className="breadcrumb-item"><a href="#">Map template columns</a></li>
            <li className="breadcrumb-item"><a href="#">Clean and finalize</a></li>
          </ol>
        </nav>
        {props.children}
      </div>
    </>
  )
}