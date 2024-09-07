import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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
        setCartItems(response.data);
        calculateTotal(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart items!", error);
      });
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.item_quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (id) => {
    axios
      .delete(
        `https://django-e-commerce-production.up.railway.app/carts/my-cart/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then(() => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
        toast.error("Product has been removed from your cart");
      })
      .catch((error) => {
        console.error(
          "There was an error removing the product from the cart!",
          error
        );
      });
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-image"
                />
                <div className="cart-info">
                  <h2>{item.product.name}</h2>
                  <p>${item.product.price}</p>
                  <div className="cart-quantity">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.item_quantity}
                      min="1"
                      onChange={(e) => {
                        const updatedItems = cartItems.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, item_quantity: e.target.value }
                            : cartItem
                        );
                        setCartItems(updatedItems);
                        calculateTotal(updatedItems);
                      }}
                    />
                  </div>
                  <button
                    className="remove-from-cart"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="total-price">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="payment-method">
            <h3>Payment Method</h3>
            <div className="fake-payment-card"></div>
            <button className="pay-now-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
