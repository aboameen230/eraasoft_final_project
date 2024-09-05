import React, { useState } from "react";
import "./index.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault(); 
    try {
      const res = await axios.post(
        "https://django-e-commerce-production.up.railway.app/contact-us/send/",
        {
          name: name,
          email: email,
          phone_number: phone,
          message: message,
        }
      );
      console.log(res.data);
      Swal.fire({
        title: "Done",
        text: "Your message has been sent successfully",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="contact mt-32 mb-24 flex flex-wrap gap-8 justify-center">
      <div className="left___side shadow-md p-4 rounded-sm">
        <div className="flex gap-2 items-center	">
          <FontAwesomeIcon
            icon={faPhone}
            className="rounded-full bg-mycolor text-white p-2"
          />
          <h3 className="font-bold">Call To Us</h3>
        </div>
        <br />
        <p>We are available 24 hours, 7 days a week.</p>
        <p className="mt-3">Phone: +20114453059</p>
        <br />
        <hr />
        <br />
        <div className="flex gap-2 items-center	">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="rounded-full bg-mycolor text-white p-2"
          />
          <h3 className="font-bold">Write To US</h3>
        </div>
        <br />
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p className="mt-3">Emails: aboameen230@gmail.com</p>
        <p className="mt-3">Emails: aboameen2300@gmail.com </p>
      </div>
      <form onSubmit={submit}>
        <div className="right___side shadow-md relative p-4 rounded-sm">
          <div className="frist_layer layer1">
            <input
              className="lapel1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
            <input
              className="lapel1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your Email"
            />
            <input
              className="lapel1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Your Phone"
            />
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="sec_layer mt-6 flex m-auto"
            placeholder="Your Message"
          />
          <button
            type="submit"
            className="btn_cont mt-11 absolute bg-mycolor text-white rounded py-3 px-8"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
