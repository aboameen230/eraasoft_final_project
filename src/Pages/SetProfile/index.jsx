import React, { useState } from "react";
import "./index.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null); // State for handling image upload

  async function submit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone_number", phone);
      formData.append("password", password);
      formData.append("image", image); 
      const id = window.localStorage.getItem("ID");

      const res = await axios.patch(
        `https://django-e-commerce-production.up.railway.app/customers/profiles/${id}/`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      if (res.data) {
        Swal.fire({
          title: "Done",
          text: "Your Profile has been changed successfully",
          icon: "success",
        });
        navigate("/My_Profile");
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div className="profile mt-32 mb-24 flex flex-wrap gap-8 justify-center">
      <form onSubmit={submit} className="profile-form shadow-md p-4 rounded-sm">
        <input
          className="profile-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
        />
        <br />
        <br />
        <input
          className="profile-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
        />
        <br />
        <br />
        <input
          className="profile-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Your Address"
        />
        <br />
        <br />
        <input
          className="profile-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="Your Phone"
        />
        <br />
        <br />
        <input
          className="profile-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your Password"
        />
        <br />
        <br />
        {/* Image upload input */}
        <button className="btnfileimg">
          <div className="parttt1">
            <FontAwesomeIcon icon={faUpload} /> <p>Upload Image</p>
          </div>
          <input
            className="fileimg"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </button>
        <br />
        <br />
        <button
          type="submit"
          className="profile-btn bg-mycolor text-white rounded py-3 px-8"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
