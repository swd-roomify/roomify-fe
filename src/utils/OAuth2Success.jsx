import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", JSON.stringify(decoded));
        localStorage.setItem("user", JSON.stringify(decoded));
      } catch (error) {
        console.error("Invalid token:", error);
      }

      navigate("/room");
    } else {
      console.error("No token found in URL");
      navigate("/signin");
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2Success;
