import styles from './App.module.css'
import {Routes, Route, Navigate} from "react-router-dom";
import ShoppingCart from "./pages/orders/shoppingcart/ShoppingCart.jsx";
import Home from "./pages/home/Home.jsx";
import MainGallery from "./pages/galleries/MainGallery.jsx";
import ArtistGallery from "./pages/galleries/ArtistGallery.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Order from "./pages/orders/order/Order.jsx";
import Confirmation from "./pages/orders/confirmation/Confirmation.jsx";
import About from "./pages/about/About.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AddNewArtwork from "./pages/artworks/AddNewArtwork.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import React, {useContext} from "react";
import Register from "./pages/register/Register.jsx";
import ArtworkDetails from "./pages/artworkDetails/ArtworkDetails/ArtworkDetails.jsx";
import MyOrders from "./pages/profile/myorders/MyOrders.jsx";
import MyReviews from "./pages/profile/myReviews/MyReviews.jsx";
import LeftReviewsForArtist from "./pages/artists/LeftReviewsForArtist.jsx";


function App() {
    const {isAuth, user} = useContext(AuthContext);

    return (
        <>
            <div className={styles.appContainer}>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/maingallery" element={<MainGallery/>}/>
                        <Route path="/maingallery/:id" element={<ArtworkDetails/>}/>
                        <Route path="/artistgallery"
                               element={isAuth && user.authority === "ROLE_ARTIST" ? <ArtistGallery/> :
                                   <Navigate to="/"/>}/>
                        <Route path="/artistgallery/:id" element={<ArtworkDetails/>}/>
                        <Route path="/artistgallery/addnewartwork" element={<AddNewArtwork/>}/>
                        <Route path="/artistgallery/leftreviews" element={<LeftReviewsForArtist/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/myorders" element={<MyOrders/>}/>
                        <Route path="/myreviews" element={<MyReviews/>}/>
                        <Route path="/shoppingcart" element={<ShoppingCart/>}/>
                        <Route path="/order" element={<Order/>}/>
                        <Route path="/confirmation" element={<Confirmation/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <Footer/>
            </div>
        </>
    )
}

export default App
