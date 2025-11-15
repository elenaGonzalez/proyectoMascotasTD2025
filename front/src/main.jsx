import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

// ⬇️ Importá el contexto global del buscador
import { SearchProvider } from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ⬇️ Envolvemos toda la app para que Navbar y Carrusel (y otras secciones) compartan el buscador */}
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
