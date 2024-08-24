import React, { useEffect, useState } from "react";
import "../Home/index.scss";
import banner from "../../Assets/Frame 560.jpg";
import mobile from "../../Assets/Category-CellPhone.png";
import computer from "../../Assets/Category-Computer.png";
import smartwatch from "../../Assets/Category-SmartWatch.png";
import camera from "../../Assets/Category-Camera.png";
import headphone from "../../Assets/Category-Headphone.png";
import gamepad from "../../Assets/Category-Gamepad.png";
import triangle from "../../Assets/iconcategories.png";
import lasttriangle from "../../Assets/ourpro.png";
import lasttriangle2 from "../../Assets/this month.png";
import banner2 from "../../Assets/Frame 600 new.jpg";
import Features from "../../Components/Features";

import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    axios
      .get("https://django-e-commerce-production.up.railway.app/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredProductId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  // const handleAddToCart = (product) => {
  //   axios
  //     .post(
  //       "https://django-e-commerce-production.up.railway.app/carts/my-cart/",
  //       {
  //         product_id: product.id,
  //         item_quantity: 1,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${window.localStorage.getItem(
  //             "accessToken"
  //           )}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Product added to cart:", response.data);
  //       alert("Added to cart successfully");
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There was an error adding the product to the cart!",
  //         error
  //       );
  //     });
  // };

  const handleAddToCart = (product) => {
    axios
      .get(
        "https://django-e-commerce-production.up.railway.app/carts/my-cart/",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }     
      )
      .then((response) => {
        const cart = response.data;

        const productIncart = cart.some(
          (cartItem) => cartItem.product.id === product.id
        );

        if (productIncart) {
          Swal.fire({
            title: "Error",
            text: "This product already exists in the cart",
            icon: "error",
          });
          console.log("Product already exists in the cart");
        } else {
          axios
            .post(
              "https://django-e-commerce-production.up.railway.app/carts/my-cart/",
              {
                product_id: product.id,
                item_quantity: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response) => {
              console.log("Product added to cart:", response.data);
              Swal.fire({
                title: "Done",
                text: "Your Product has been added to cart successfully",
                icon: "success",
              });
            })
            .catch((error) => {
              console.error(
                "There was an error adding the product to the cart!",
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the cart!", error);
      });
  };
  const handleAddToWishlist = (product) => {
    axios
      .get(
        "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then((response) => {
        const wishlist = response.data;

        const productInwishlist = wishlist.some(
          (wishlistItem) => wishlistItem.product.id === product.id
        );

        if (productInwishlist) {
          Swal.fire({
            title: "Error",
            text: "This product already exists in the wishlist",
            icon: "error",
          });
          console.log("Product already exists in the wishlist");
        } else {
          axios
            .post(
              "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
              {
                product_id: product.id,
                item_quantity: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response) => {
              console.log("Product added to wishlist:", response.data);
              Swal.fire({
                title: "Done",
                text: "Your Product has been added to wishlist successfully",
                icon: "success",
              });
            })
            .catch((error) => {
              console.error(
                "There was an error adding the product to the wishlist!",
                error
              );
            });
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  };

  return (
    <div className="mt-28">
      <img src={banner} alt="Banner" className="bannerr" />
      <div className="categories_contain w-full">
        <div className="subject">
          <img src={triangle} alt="Triangle" className="mb-4" />
          <h1 className="text-3xl">
            <strong>Browse By Category</strong>
          </h1>
        </div>
        <div className="categories">
          <Link to="/Shop" className="category">
            <img src={mobile} alt="Mobile" className="iconcat" />
            <h1 className="titlecat">Mobiles</h1>
          </Link>
          <Link to="/Shop" className="category">
            <img src={computer} alt="Computer" className="iconcat" />
            <h1 className="titlecat">Computers</h1>
          </Link>
          <Link to="/Shop" className="category">
            <img src={smartwatch} alt="Smartwatch" className="iconcat" />
            <h1 className="titlecat">Smartwatches</h1>
          </Link>
          <Link to="/Shop" className="category">
            <img src={camera} alt="Camera" className="iconcat" />
            <h1 className="titlecat">Cameras</h1>
          </Link>
          <Link to="/Shop" className="category">
            <img src={headphone} alt="Headphone" className="iconcat" />
            <h1 className="titlecat">Headphones</h1>
          </Link>
          <Link to="/Shop" className="category">
            <img src={gamepad} alt="Gamepad" className="iconcat" />
            <h1 className="titlecat">Gaming</h1>
          </Link>
        </div>
      </div>
      <hr className="hrr text-5xl" />
      <div className="subject">
        <img src={lasttriangle2} alt="Last Triangle" className="mb-4" />
        <div className="flex justify-between">
          <h1 className="text-3xl">
            <strong>Best Selling Products</strong>
          </h1>
          <Link to="/Shop">
            <button className="bg-mycolor px-8 py-3 text-white rounded">
              View All
            </button>
          </Link>
        </div>
      </div>
      <div className="products">
        {Array.isArray(products) &&
          products.slice(8, 12).map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
              className="product-card"
            >
              <img src={product.image} alt={product.name} />
              <h1 className="text-xl">
                <strong>{product.name}</strong>
              </h1>
              <div className="raw1 flex gap-4">
                <p className="text-mycolor text-lg font-medium">
                  ${product.price}
                </p>
                <div className="rating mb-1">
                  <span className="text-yellow-300 font-bold text-xl">
                    {"★".repeat(Math.floor(product.average_rating)) +
                      "☆".repeat(5 - Math.floor(product.average_rating))}
                  </span>
                  <span>({product.average_rating})</span>
                </div>
              </div>
              {hoveredProductId === product.id && (
                <button
                  className="buttoncart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
              <button
                className="product_heart"
                onClick={() => handleAddToWishlist(product)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          ))}
      </div>
      <img src={banner2} alt="Banner 2" className="bannerr" />
      <div className="comp_products">
        <div className="subject">
          <img src={lasttriangle} alt="Last Triangle" className="mb-4" />
          <h1 className="text-3xl">
            <strong>Explore Our Products</strong>
          </h1>
        </div>
        <div className="products">
          {Array.isArray(products) &&
            products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
                className="product-card"
              >
                <img src={product.image} alt={product.name} />
                <h1 className="text-xl">
                  <strong>{product.name}</strong>
                </h1>
                <div className="raw1 flex gap-4">
                  <p className="text-mycolor text-lg font-medium">
                    ${product.price}
                  </p>
                  <div className="rating mb-1">
                    <span className="text-yellow-300 font-bold text-xl">
                      {"★".repeat(Math.floor(product.average_rating)) +
                        "☆".repeat(5 - Math.floor(product.average_rating))}
                    </span>
                    <span>({product.average_rating})</span>
                  </div>
                </div>
                {hoveredProductId === product.id && (
                  <button
                    className="buttoncart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  className="product_heart"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            ))}
        </div>
        <Link className="linkbtn" to="/Shop">
          <button>View All Products</button>
        </Link>
      </div>
      <Features />
    </div>
  );
}
