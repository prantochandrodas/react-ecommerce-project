import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from './Components/Context/ShopContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    </QueryClientProvider>
  </React.StrictMode>

  ,
)
