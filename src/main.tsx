import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import './css/tailwind.css'
import './styles/fondosMain.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
