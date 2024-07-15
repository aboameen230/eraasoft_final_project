/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./index.scss";
import side__img from "../../Assets/Side--Image.png";
import frame1 from "../../Assets/Frame 700.png";
import frame2 from "../../Assets/Frame 701.png";
import frame3 from "../../Assets/Frame 702.png";
import frame4 from "../../Assets/Frame 703.png";
import aboameen from "../../Assets/aboameen.jpg";
import hefny from "../../Assets/7efny.jpg";
import abdallah from "../../Assets/Abdallah.jpg";
import yahia from "../../Assets/yahia.jpg";
import omar_f from "../../Assets/omar_f.jpg";
import Ahmed_f from "../../Assets/Ahmed_f.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Features from "../../Components/Features";

export default function About() {
  return (
    <div className="mt-36">
      <div className="con">
        <div className="side1 mt-24 ">
          <h1 className="font-bold text-5xl">Our Story</h1>
          <br />
          <p className="text-xl">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <br />
          <p className="text-xl">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img src={side__img} className="woman" />
      </div>

      <div className="sec1 flex flex-wrap justify-evenly mt-28">
        <img src={frame1} />
        <img src={frame2} className="bg-mycolor" />
        <img src={frame3} className="imgggg" />
        <img src={frame4} className="imggggg" />
      </div>

      <div className="mt-28 photoes">
        <div className="ameen">
          <img src={hefny} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Mahmoud Hefny</h1>

          <p>Back-End Developer</p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
        <div className="ameen">
          <img src={aboameen} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Ahmed Ameen</h1>

          <p>Product Designer</p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
        <div className="ameen">
          <img src={omar_f} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Omar Fathy</h1>

          <p>Flutter Developer </p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
        <div className="ameen">
          <img src={yahia} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Yahia Mohamed</h1>

          <p>Back-End Developer </p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
        <div className="ameen">
          <img src={Ahmed_f} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Ahmed Fathy</h1>

          <p>Ui/Ux Designer </p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
        <div className="ameen">
          <img src={abdallah} className="rounded-sm" />
          <br />
          <h1 className="text-2xl font-semibold">Abdullah Gaber</h1>

          <p>Front-End Developer </p>
          <FontAwesomeIcon className="i" icon={faFacebook} />
          <FontAwesomeIcon className="i" icon={faTwitter} />
          <FontAwesomeIcon className="i" icon={faLinkedin} />
        </div>
      </div>
      <Features />
    </div>
  );
}
