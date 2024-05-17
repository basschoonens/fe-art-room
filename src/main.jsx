import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AuthContextProvider from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    // TODO React StrictMode verwijderd
    <Router>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </Router>
)
