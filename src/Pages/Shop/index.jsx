import React, { useEffect, useState } from "react";
import "../Shop/index.scss"; // Create a separate style file for the shop page if needed
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
        setWishlistProducts(wishlist.map((item) => item.product.id));

        const wishlistItem = wishlist.find(
          (item) => item.product.id === product.id
        );

        if (wishlistItem) {
          axios
            .delete(
              `https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/${wishlistItem.id}/`,
              {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then(() => {
              setWishlistProducts((prevWishlist) =>
                prevWishlist.filter((id) => id !== product.id)
              );
              Swal.fire({
                title: "Removed",
                text: "Product has been removed from your wishlist.",
                icon: "info",
              });
            })
            .catch((error) => {
              console.error(
                "There was an error removing the product from the wishlist!",
                error
              );
            });
        } else {
          axios
            .post(
              "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
              {
                product_id: product.id,
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
              setWishlistProducts((prevWishlist) => [
                ...prevWishlist,
                product.id,
              ]);
              Swal.fire({
                title: "Added",
                text: "Product has been added to your wishlist.",
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop-container mt-28">
      <h1 className="text-3xl mb-6 text-center">
        <strong>Shop All Products</strong>
      </h1>

      {/* Search bar */}
      <div className="search-bar mb-6 text-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product) => (
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
                style={{
                  backgroundColor: wishlistProducts.includes(product.id)
                    ? "red"
                    : "rgb(220, 219, 219)",
                }}
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
  );
}
