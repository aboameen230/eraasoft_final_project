import React, { useState } from "react";
import "./index.scss";
import logo from "../../Assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBars, faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import DropDownProfile from "../DropDownProfile";
import Wishbar from "../wishlist";
import axios from "axios";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const wishlistUrl = "/wishlists/my-wishlist/";
    try {
      const response = await axios.get(wishlistUrl, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlistUrl:", error);
    }
  };

  const handleWishlistClick = () => {
    setWishlistVisible(true);
    fetchWishlist();
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 bg-white z-50 ">
      <Wishbar
        isVisible={wishlistVisible}
        onClose={() => setWishlistVisible(false)}
        wishlist={wishlist}
      />
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
        <div className="flex text-2x1 cursor-pointer items-center gap-2">
          <Link to="/Home">
            <img src={logo} alt="logo" className="w-60 h-10" />
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>

        <ul
          className={`gg md:flex md:items-center md:pb-0 pb-12 absolute md:static !bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <li>
            <Link className="font-bold my-7 mf:my-0 md:ml-8" to="/Home">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-bold my-7 mf:my-0 md:ml-8" to="/Shop">
              Shop
            </Link>
          </li>
          <li>
            <Link className="font-bold my-7 mf:my-0 md:ml-8" to="/Contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="font-bold my-7 mf:my-0 md:ml-8" to="/About">
              About
            </Link>
          </li>
          <li>
            {window.localStorage.getItem("email") ? (
              <div className="ml-20 flex gap-4 items-center">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faHeart}
                  onClick={handleWishlistClick}
                />
                <Link to="/Cart">
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faCartShopping}
                  />
                </Link>
                <FontAwesomeIcon
                  onClick={() => setOpenProfile((prev) => !prev)}
                  icon={faUser}
                  className=" cursor-pointer bg-mycolor p-2 rounded-full text-white"
                />
              </div>
            ) : (
              <Link to="/Log_in">
                <button className=" ggg btn bg-mycolor text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static">
                  Sign in
                </button>
              </Link>
            )}
          </li>
        </ul>
        {openProfile && <DropDownProfile />}
      </div>
    </div>
  );
}
