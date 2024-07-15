import React from "react";
import "./index.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function DropDownProfile() {
  function Logout() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("ID");
    window.location.pathname = "/";
  }
  return (
    <div className="flex flex-col Drop">
      <ul className="flex flex-col gap-4">
        <li className="flex gap-4 items-center">
          <Link
            className="flex gap-4 items-center hover:text-mycolor"
            to="/SetProfile"
          >
            <FontAwesomeIcon icon={faUser} />
            <p>Manage My Account</p>
          </Link>
        </li>
        <li className="flex gap-4 items-center">
          <Link
            className="flex gap-4 items-center hover:text-mycolor"
            to="/My_Profile"
          >
            <FontAwesomeIcon icon={faUser} />
            <p>My Profile</p>
          </Link>
        </li>
        <li className="flex gap-4 items-center hover:text-mycolor">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <button onClick={Logout}>
            <p>Log out</p>
          </button>
        </li>
      </ul>
    </div>
  );
}
