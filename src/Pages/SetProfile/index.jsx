import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./index.scss";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://django-e-commerce-production.up.railway.app/customers/profiles/",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        const data = response.data["0"];
        setCustomerData(data);
        setName(data.customer.full_name);
        setEmail(data.customer.email);
        setAddress(data.customer.address);
        setPhone(data.customer.phone_number);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function submit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone_number", phone);
      formData.append("password", password);
      formData.append("image", image);
      const id = Cookies.get("ID");

      const res = await axios.patch(
        `https://django-e-commerce-production.up.railway.app/customers/profiles/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (res.data) {
        Swal.fire({
          title: "Done",
          text: "Your Profile has been changed successfully",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  if (loading) return <div className="loader">Loading...</div>;
  if (error)
    return (
      <div className="text-black font-bold text-3xl flex justify-center items-center">
        Error fetching data: {error.message}
      </div>
    );

  return (
    <div className="profile-page flex flex-wrap gap-8 justify-center mt-20">
      <div className="profile-display">
        {customerData && (
          <div className="myp shadow-md p-4 rounded-sm">
            <p>Name: {customerData.customer.full_name}</p>
            <hr />
            <p>Email: {customerData.customer.email}</p>
            <hr />
            <p>Address: {customerData.customer.address}</p>
            <hr />
            <p>Phone: {customerData.customer.phone_number}</p>
            <hr />
            <h1>Profile Image:</h1>
            <img src={customerData.image} alt="Profile" />
          </div>
        )}
      </div>
      <div className="profile-update">
        <form
          onSubmit={submit}
          className="profile-form shadow-md p-4 rounded-sm"
        >
          <input
            className="profile-input"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={name}
          />
          <br />
          <input
            className="profile-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={email}
          />
          <br />
          <input
            className="profile-input"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder={address}
          />
          <br />
          <input
            className="profile-input"
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder={phone}
          />
          <br />
          <input
            className="profile-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your Password"
          />
          <br />
          <br />
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
    </div>
  );
}
