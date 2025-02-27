import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 
import { getUserUtil } from "./AuthUtil";

const OAuth2Success = () => {
  const navigate = useNavigate();



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", (decoded));
        if(decoded.username){
          getUserUtil(decoded.username)
            .then((userData) => {
              localStorage.setItem("user", JSON.stringify(userData));
              navigate('/room');
            })
            .catch((error) => {
              console.error("Error fetching user data",error);
              navigate('/signin');
            });
        }
        else{
          console.error("No username found in token claims");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }

    } else {
      console.error("No token found in URL");
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2Success;
