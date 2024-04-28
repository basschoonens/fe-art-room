import './App.css'
import { Routes, Route } from "react-router-dom";
import ShoppingCart from "./pages/orders/ShoppingCart.jsx";

function App() {

  return (
    <>
      <h1>Dit is mijn eerste pagina</h1>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maingallery" element={<MainGallery />} />
            <Route path="/usergallery" element={<UserGallery />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/purchased" element={<Purchased />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
