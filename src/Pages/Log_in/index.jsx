import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import sideImage from "../../Assets/Side Image.png";
import axios from "axios";
import isPasswordValid from "../../passwordValidator";
import toast from "react-hot-toast";
import Cookies from "js-cookie";


const LogIn = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const [emailOrPhoneError, setEmailOrPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setEmailOrPhoneError("");
    setPasswordError("");

    if (emailOrPhone === "") {
      setEmailOrPhoneError("Please enter your email or phone.");
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please enter a valid password.");
    }

    if (emailOrPhone === "" || !isPasswordValid(password)) {
      return;
    }

    try {
      const response = await axios.post(
        "https://django-e-commerce-production.up.railway.app/customers/login/",
        {
          email_or_phone: emailOrPhone,
          password: password,
        }
      );

      const responseData = response.data;

      console.log("Response received from the server:");
      console.log(responseData);

      Cookies.set("accessToken", responseData.access);
      Cookies.set("ID", responseData.user.id);
      window.location.pathname = "/";

      if (responseData && responseData.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Please check your email/phone and password");
      console.error("There was an error ", error);
    }
  };

  return (
    <div className="mt-20">
      <div className="container">
        <img className="img1" src={sideImage} alt="" />
        <div className="form-box-login mt-16">
          <p>Enter your details below</p>
          <form onSubmit={submit}>
            <div className="input-box-login">
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              {emailOrPhoneError && (
                <p className="error-text">{emailOrPhoneError}</p>
              )}
            </div>
            <br />
            <div className="input-box-login">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>
            <br />
            <div className="ll">
              <button type="submit">Log in</button>
              <Link to="/Reseturpass">Forgot Password?</Link>
            </div>
          </form>
          <p className="al">
            Haven't Account?<span> </span>
            <Link className="a" to="/Sign_up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
