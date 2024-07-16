import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/index";
// import Home from "./Pages/Home/index";
import Footer from "./Components/Footer/index";
import Contact from './Pages/Contact/index';
import LogIn from './Pages/Log_in/index';
import About from './Pages/About/index';
import Not_found from './Pages/Not_Found/index';
import Sign_up from './Pages/Sign_up/index';
import Profile from "./Pages/SetProfile";
import My_Profile from "./Pages/My_Profile";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} /> */}
            <Route path="/Log_in" element={<LogIn />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Sign_up" element={<Sign_up />} />
            <Route path="/About" element={<About />} />
            <Route path="/SetProfile" element={<Profile />} />
            <Route path="/My_Profile" element={<My_Profile />} />
            <Route path="*" element={<Not_found />} />
          </Route>
        </Routes>
        <Outlet />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

//ameen230@gamil.com 01018321361
//230122001AsD@@