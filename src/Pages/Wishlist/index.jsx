import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./index.scss";

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
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
        setWishlistProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    axios
      .delete(
        `https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/${productId}/`,
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
          prevWishlist.filter((product) => product.product.id !== productId)
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
}
