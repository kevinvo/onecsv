import React, { StrictMode }  from "react";
import { createRoot } from "react-dom/client";
import SelectFile from "./select_file";

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SelectFile />
  </StrictMode>
)
