import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";

export default function My_Profile() {
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
              Authorization: `Bearer ${window.localStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        );
        setCustomerData(response.data["0"]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-black font-bold text-3xl flex justify-center items-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-black font-bold text-3xl flex justify-center items-center">
        Error fetching data: {error.message}
      </div>
    );

  return (
    <div>
      <h1>Customer Profile</h1>
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
          <img src={customerData.image} />
        </div>
      )}
    </div>
  );
}
