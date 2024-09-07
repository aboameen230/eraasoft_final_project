import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.scss"; // Make sure to create and link this stylesheet
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

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
        setWishlistItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist items!", error);
      });
  }, []);

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
          toast.success("Your Product has been added to cart successfully");
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
        console.error("There was an error fetching the cart!", error);
      });
  };

  const handleRemoveFromWishlist = (id) => {
    axios
      .delete(
        `https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then(() => {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        toast.error("Product has been removed from your wishlist.")
      })
      .catch((error) => {
        console.error(
          "There was an error removing the product from the wishlist!",
          error
        );
      });
  };

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">My Wishlist</h1>
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="wishlist-image"
              />
              <div className="wishlist-info">
                <h2>{item.product.name}</h2>
                <p>${item.product.price}</p>
                <div className="wishlist-actions">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item.product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-from-wishlist"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
      <Link to="/Shop" className="back-to-shop">
        <button className="shop-button">Continue Shopping</button>
      </Link>
    </div>
  );
}
