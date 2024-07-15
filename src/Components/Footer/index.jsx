import React from "react";
import "./index.scss";
import app from "../../Assets/app.jpg";
import play from "../../Assets/play.jpg";
import pay from "../../Assets/pay.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="col gg">
          <h4>Contact</h4>
          <p>
            <strong>Address: </strong>Elnasr-Towers Alazhr_University-street
            Asyut
          </p>
          <p>
            <strong>Phone and Email: </strong>(+20) 01144530589 -
            aboameen230@gmail.com
          </p>
          <p>
            <strong>Hours: </strong>9:00 - 17:00, Sun - Thu
          </p>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <FontAwesomeIcon className="i" icon={faFacebook} />
              <FontAwesomeIcon className="i" icon={faTwitter} />
              <FontAwesomeIcon className="i" icon={faInstagram} />
              <FontAwesomeIcon className="i" icon={faLinkedin} />
            </div>
          </div>
        </div>
        <div className="col gg">
          <h4>About</h4>
          <Link className="a" to="#">
            About us
          </Link>
          <Link className="a" to="#">
            Delivery Infomation
          </Link>
          <Link className="a" to="#">
            Privacy Policy
          </Link>
          <Link className="a" to="#">
            Terms & Conditions
          </Link>
          <Link className="a" to="#">
            Contact Us
          </Link>
        </div>

        <div className="col gg">
          <h4>My Account</h4>
          <Link className="a" to="/Log_in">
            Sign In
          </Link>
          <Link className="a" to="#">
            View Cart
          </Link>
          <Link className="a" to="#">
            My Wishlist
          </Link>
          <Link className="a" to="#">
            Track My Order
          </Link>
          <Link className="a" to="#">
            Help
          </Link>
        </div>

        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src={app} alt="" />
            <img src={play} alt="" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src={pay} alt="" />
        </div>
        <div className="copyright">
          <p>© 2023, Digital Hup - HTML CSS Electronic devices Template</p>
        </div>
      </div>
    </div>
  );
}
