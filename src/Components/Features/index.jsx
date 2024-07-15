import React from "react";
import fast from "../../Assets/fast.png";
import service from "../../Assets/service.png";
import money from "../../Assets/money.png";

export default function Features() {
  return (
    <div className="my-20 flex flex-wrap justify-evenly gap-8">
      <img className="m-2" src={fast} alt="" />
      <img className="m-2" src={service} alt="" />
      <img className="m-2" src={money} alt="" />
    </div>
  );
}
