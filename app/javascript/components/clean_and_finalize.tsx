import React, { useState, Component } from "react"
import BreadCrumb from "./bread_crumb"

function CleanAndFinalize() {
  return (
    <>
      <BreadCrumb>
        <Table />
      </BreadCrumb>
    </>
  );
}

function Table() {

  return (
    <h1>Hello World</h1>
  )

}
export default CleanAndFinalize
