import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
