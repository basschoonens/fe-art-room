import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './utils/Theme.jsx'
import { BrowserRouter as Router} from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
    // TODO React StrictMode verwijdert
      <ThemeProvider>
            <Router>
                <App />
            </Router>
      </ThemeProvider>
)
