import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import SelectFile from "./select_file";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('app')
  const root = createRoot(container!)
  root.render(<SelectFile />)
});
