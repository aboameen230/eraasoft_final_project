import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./index.scss";

export default function Updateurpass() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "https://django-e-commerce-production.up.railway.app/customers/password-update-mail/",
          {
            token: token,
            new_password: newPassword,
          }
        )
        .then((response) => {
          console.log(response.data);

          Swal.fire({
            icon: "success",
            title: "Password Updated",
            text: "Your password has been updated successfully.",
          });
          navigate("/log_in");
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="update-password-container">
      <h2>Update Your Password</h2>
      <form onSubmit={handleSubmit} className="update-password-form">
        <input
          type="text"
          value={token}
          onChange={handleTokenChange}
          placeholder="Enter the token from your email"
          required
          className="update-password-input"
        />
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="Enter your new password"
          required
          className="update-password-input"
        />
        <button type="submit" className="update-password-button">
          Update Password
        </button>
      </form>
    </div>
  );
}
