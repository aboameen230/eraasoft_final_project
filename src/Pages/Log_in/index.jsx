import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

import sideImage from "../../Assets/Side Image.png";
import axios from "axios";

import isPasswordValid from "../../passwordValidator";
import Swal from "sweetalert2";

const LogIn = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");


  const submit = async (e) => {
    e.preventDefault();


    if (emailOrPhone === "" || !isPasswordValid(password)) {
      Swal.fire({
        title: "Error",
        text: "Please check your email/phone and password",
        icon: "error",
      });
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

      window.localStorage.setItem("accessToken", responseData.access);
      window.localStorage.setItem("ID", responseData.user.id);
      window.location.pathname = "/";

      if (responseData && responseData.user) {
        navigate("/"); 
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Please check your email/phone and password",
        icon: "error",
      });
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
            </div>
            <br />
            <div className="input-box-login">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="ll">
              <button type="submit">Log in</button>
              <Link to="#">Forgot Password?</Link>
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
