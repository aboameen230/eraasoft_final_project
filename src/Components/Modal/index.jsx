import React from "react";
import "./index.scss";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Modal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

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
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
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
  const handleAddToWishlist = (product) => {
    axios
      .post(
        "https://django-e-commerce-production.up.railway.app/wishlists/my-wishlist/",
        {
          product_id: product.id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.Cookies.get(
              "accessToken"
            )}`,
          },
        }
      )
      .then((response) => {
        toast.success("Your Product has been added to wishlist successfully");
      })
      .catch((error) => {
        console.error(
          "There was an error adding the product to the wishlist!",
          error
        );
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="flex justify-between">
            <p>${product.price}</p>
            <div className="rating mb-1">
              <span className="text-yellow-300 font-bold text-xl">
                {"★".repeat(Math.floor(product.average_rating)) +
                  "☆".repeat(5 - Math.floor(product.average_rating))}
              </span>
              <span>({product.average_rating})</span>
            </div>
          </div>
          <button
            className="modal-button"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="modal-button"
            onClick={() => handleAddToWishlist(product)}
          >
            Add to Wichlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
