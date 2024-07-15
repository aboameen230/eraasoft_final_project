import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://django-e-commerce-production.up.railway.app/";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const navigate = useNavigate();
    const tokenrefresh = localStorage.getItem("accessToken");
    const tokenaccess = localStorage.getItem("refreshToken");
    if (error.response.status === 401 || !tokenaccess) {
      if (tokenrefresh) {
        axios
          .post("customers/token/refresh/", { refresh: tokenrefresh })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.access);
            window.location.reload();
          })
          .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          });
      } else {
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
