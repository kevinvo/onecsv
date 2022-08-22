import * as React from "react";
import * as ReactDOM from "react-dom";
import SelectFile from "./select_file";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  ReactDOM.render(<SelectFile />, rootEl);
});
