import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./index.scss";

const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        setWishlistProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      console.log(response); // Log the response from the server
      console.log(response.status); // Log the status code of the response
      console.log(response.data); // Log the data returned by the server
      setWishlistProducts((prevWishlist) =>
        prevWishlist.filter((product) => product.product.id !== productId)
      );
      Swal.fire({
        title: "Removed",
        text: "Product has been removed from your wishlist.",
        icon: "info",
      });
    } catch (error) {
      console.error(error); // Log the error
      console.error(error.response); // Log the error response
      setError(error.message);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.get(
        "https://django-e-commerce-production.up.railway.app/carts/my-cart/",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      const cart = response.data;
      const productInCart = cart.some(
        (cartItem) => cartItem.product.id === product.id
      );
      if (productInCart) {
        Swal.fire({
          title: "Error",
          text: "This product already exists in the cart",
          icon: "error",
        });
      } else {
        await axios.post(
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
        );
        Swal.fire({
          title: "Done",
          text: "Your Product has been added to cart successfully",
          icon: "success",
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="wishlist-page mt-20">
      <h1>Your Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-products">
          {wishlistProducts.map((wishlistItem) => (
            <div
              key={wishlistItem.product.id}
              className="wishlist-product-card"
            >
              <img
                src={wishlistItem.product.image}
                alt={wishlistItem.product.name}
              />
              <div className="wishlist-product-info">
                <h2>{wishlistItem.product.name}</h2>
                <p>${wishlistItem.product.price}</p>
                <button
                  className="buttoncart"
                  onClick={() => handleAddToCart(wishlistItem.product)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
                <button
                  className="remove-button"
                  onClick={() =>
                    handleRemoveFromWishlist(wishlistItem.product.id)
                  }
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link className="linkbtn" to="/Shop">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Wishlist;
