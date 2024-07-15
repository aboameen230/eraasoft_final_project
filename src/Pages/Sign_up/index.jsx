import React, { useState } from "react";
import "./index.scss";
import side from "../../Assets/Side Image.png";
import Google from "../../Assets/google icon.png";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import isPasswordValid from "../../passwordValidator";

export default function Sign_up() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [flag, setFlag] = useState(true);

  console.log(flag);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    if (name === "" || !isPasswordValid(password) || phone.length !== 11) {
      setFlag(false);
      // Show alert to the user that the credentials are invalid "In the browser"
      alert("");
    } else setFlag(true);

    if (flag) {
      const response = await axios
        .post(
          "https://django-e-commerce-production.up.railway.app/customers/signup/",
          {
            full_name: name,
            email: email,
            password: password,
            phone_number: phone,
          }
        )

        // IF the request is successful, the server will respond with a 2xx status code
        .then((res) => {
          // Log the response data
          console.log("Response received from the server:");
          console.log(res.data);
          window.location.pathname = "/Log_in";
          if (res.data && res.data.user) {
            console.log(`Signup successful. User ID: ${res.data.user.id}`);

            navigate("/Log_in"); // Redirect to the home page
          }
        });
      console.log(response.data);
    }
    // console.log(res);
  }

  return (
    <div className="mt-20">
      <div className="container ">
        <img className="img1" src={side} alt="" />
        <div className="form-box signup">
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          <form className="ss" onSubmit={submit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name === "" && accept && (
                <p className="text-red-600">Username is Required</p>
              )}
            </div>
            <br />
            <div className="input-box">
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="input-box">
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phone.length !== 11 && accept && (
                <p className="text-red-600">Phonenumber must be 11 number</p>
              )}
            </div>
            <br />
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <p className="text-red-600">
                  Password must be more than 8 number
                </p>
              )}
            </div>
            <br />
            <button type="submit" id="c">
              Create Account
            </button>
            <br />
            <button id="g">
              <img src={Google} alt="" /> Sign up with Google
            </button>
          </form>
          <p className="al">
            Already Have Account?<span> </span>
            <Link className="a" to="/Log_in">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
