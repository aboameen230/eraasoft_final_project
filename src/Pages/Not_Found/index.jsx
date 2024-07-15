import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

export default function Not_found() {
  return (
    <div className="mt-20">
      <div className="error ">
        <h1>
          404 <br />
          Page Not Found
        </h1>
        <p>Your visited page not found. You may go home page.</p>
        <Link to="/Home">
          <button>Back to home page</button>
        </Link>
      </div>
    </div>
  );
}
