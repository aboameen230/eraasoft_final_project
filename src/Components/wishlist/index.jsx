import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Wishbar = ({ isVisible, onClose, wishlist }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-[20%] bg-gray-100 text-gray-800 h-full p-4 transition-transform duration-300 ${
        isVisible ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <button onClick={onClose}>
          <FontAwesomeIcon
            icon={faX}
            className="text-black text-md hover:text-red-500 transition-colors duration-200"
          />
        </button>
      </div>
      <ul>
        {wishlist.map((item) => (
          <li
            key={item.product.id}
            className="mb-2 p-2 border-b border-gray-700"
          >
            <div className="flex items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 mr-4"
              />
              <div>
                <h3 className="text-lg">{item.product.name}</h3>
                <p className="text-sm text-gray-400">
                  {item.product.description}
                </p>
                <p className="text-sm text-gray-400">
                  Price: ${item.product.price}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishbar;
