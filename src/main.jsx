import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartContext } from './Contexts/CartContext'
import SessionContextProvider from './Contexts/SessionContext'
import CartContextProvider from './Contexts/CartContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <SessionContextProvider>
  <CartContextProvider>
    <App />
    </CartContextProvider>
    </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
