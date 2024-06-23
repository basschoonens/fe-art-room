import styles from './App.module.css'
import {Routes, Route, Navigate} from "react-router-dom";
import ShoppingCart from "./pages/orders/shoppingcart/ShoppingCart.jsx";
import Home from "./pages/home/Home.jsx";
import MainGallery from "./pages/galleries/MainGallery.jsx";
import ArtistGallery from "./pages/galleries/ArtistGallery.jsx";
import Login from "./pages/login/Login.jsx";
import MyProfile from "./pages/profile/myProfile/MyProfile.jsx";
import Order from "./pages/orders/order/PlaceOrder.jsx";
import Confirmation from "./pages/orders/confirmation/Confirmation.jsx";
import About from "./pages/about/About.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import AddNewArtwork from "./pages/artists/addArtwork/AddNewArtwork.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import React, {useContext} from "react";
import Register from "./pages/register/Register.jsx";
import ArtworkDetails from "./pages/artworkDetails/ArtworkDetails.jsx";
import MyOrders from "./pages/profile/myOrders/MyOrders.jsx";
import MyReviews from "./pages/profile/myReviews/MyReviews.jsx";
import LeftReviewsForArtist from "./pages/artists/LeftReviewsForArtist.jsx";
import EditArtwork from "./pages/artists/editArtwork/EditArtwork.jsx";


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
                        <Route path="/editartwork/:id" element={<EditArtwork />}/>
                        <Route path="/artistgallery/leftreviews" element={<LeftReviewsForArtist/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<MyProfile/>}/>
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
