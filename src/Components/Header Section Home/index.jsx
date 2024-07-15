import React from "react";
import "../Header Section Home/index.scss";

export default function HeaderSectionHome(props) {
  return (
    <>
      <div className="header_sales">
        <div className="horizental_child"></div>
        <span> {props.day}</span>
        <h2>{props.namesection}</h2>
      </div>
    </>
  );
}
