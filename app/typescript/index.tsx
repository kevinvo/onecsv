import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

// root.render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
