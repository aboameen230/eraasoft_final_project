import React from "react";
import "./index.scss";

const Modal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

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
          <button className="modal-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
