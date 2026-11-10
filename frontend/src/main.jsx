import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tipografía Inter instalada con npm (no depende de internet al ejecutar)
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
