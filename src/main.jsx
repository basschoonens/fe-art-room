import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import AuthContextProvider from "./context/AuthContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    // React StrictMode verwijderd
    <Router>
        <AuthContextProvider>
            <CartProvider>
                <App/>
            </CartProvider>
        </AuthContextProvider>
    </Router>
)
