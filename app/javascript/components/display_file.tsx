import React, { useState, useEffect, useMemo, useRef, HTMLProps } from "react"
import Table  from "./table";
import BreadCrumb from "./bread_crumb";
import axios from "axios"

function DisplayFile() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    axios.get("api/csv_content").then(function (res) {
      // console.log("res = " + res)
      setRows(res.data)
    })
  }, [])


  return (
    <>
      <BreadCrumb>
        <Table rows={[]} />
      </BreadCrumb>
    </>
  )
}

export default DisplayFile
