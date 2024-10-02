import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../../Components/Modal";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

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
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((response) => {
        const cart = response.data;
        const productIncart = cart.some(
          (cartItem) => cartItem.product.id === product.id
        );

        if (productIncart) {
          toast.success("Your Product has been added to cart successfully");
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
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            )
            .then((response) => {
              toast.success("Your Product has been added to cart successfully");
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
        Swal.fire({
          title: "error",
          text: "Please Sign up or log in to use add to cart",
          icon: "error",
        });
        console.error("There was an error fetching the cart!", error);
      });
  };

  const handleAddToWishlist = (product) => {
    axios
      .get(
        "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
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
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            )
            .then(() => {
              setWishlistProducts((prevWishlist) =>
                prevWishlist.filter((id) => id !== product.id)
              );
              toast.error("Product has been removed from your wishlist");
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
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            )
            .then((response) => {
              setWishlistProducts((prevWishlist) => [
                ...prevWishlist,
                product.id,
              ]);
              toast.success(
                "Your Product has been wishlist to cart successfully"
              );
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
        Swal.fire({
          title: "error",
          text: "Please Sign up or log in to use add to wishlist",
          icon: "error",
        });
        console.error("There was an error fetching the wishlist!", error);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop-container mt-28">
      <h1 className="text-3xl mb-6 text-center">
        <strong>Shop All Products</strong>
      </h1>

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
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleProductClick(product)}
              />
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
                    ? "#db4444"
                    : "rgb(220, 219, 219)",
                }}
                onClick={() => handleAddToWishlist(product)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          ))}
      </div>

      <Link className="linkbtn" to="/Home">
        <button>Back To Home</button>
      </Link>
      {selectedProduct && (
        <Modal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
