import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/index";
import Home from "./Pages/Home/index";
import Footer from "./Components/Footer/index";
import Contact from "./Pages/Contact/index";
import LogIn from "./Pages/Log_in/index";
import About from "./Pages/About/index";
import Not_found from "./Pages/Not_Found/index";
import Sign_up from "./Pages/Sign_up/index";
import Profile from "./Pages/SetProfile";
import Shop from "./Pages/Shop";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import { Toaster } from "react-hot-toast";
import Reseturpass from "./Pages/Reseturpass";
import Updateurpass from './Pages/Updateurpass/index';

export default function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />{" "}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Log_in" element={<LogIn />} />
            <Route path="/Reseturpass" element={<Reseturpass />} />
            <Route path="/Updateurpass" element={<Updateurpass />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Sign_up" element={<Sign_up />} />
            <Route path="/About" element={<About />} />
            <Route path="/SetProfile" element={<Profile />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<Not_found />} />
          </Route>
        </Routes>
        <Outlet />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
