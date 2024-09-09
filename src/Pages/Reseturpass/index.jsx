import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./index.scss";

export default function Reseturpass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://django-e-commerce-production.up.railway.app/customers/password-reset-mail/",
        {
          email: email,
        }
      );
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "Check your email for the password reset link.",
      });

      navigate("/Updateurpass");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="reset-password-container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="reset-password-input"
          />
          <button type="submit" className="reset-password-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
