import './App.css'
import {Routes, Route} from "react-router-dom";
import ShoppingCart from "./pages/orders/ShoppingCart.jsx";
import Home from "./pages/home/Home.jsx";
import MainGallery from "./pages/galleries/MainGallery.jsx";
import UserGallery from "./pages/galleries/UserGallery.jsx";
import Artist from "./pages/artist/Artist.jsx"
import Login from "./pages/login/Login.jsx";
import Register from "./pages/registration/Register.jsx";
import Profile from "./pages/registration/Profile.jsx";
import Order from "./pages/orders/Order.jsx";
import Purchased from "./pages/orders/Purchased.jsx";
import About from "./pages/about/About.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";



function App() {

    return (
        <>
            <div className="app-container">
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/maingallery" element={<MainGallery/>}/>
                    <Route path="/usergallery" element={<UserGallery/>}/>
                    <Route path="/artist" element={<Artist/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/purchased" element={<Purchased/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
