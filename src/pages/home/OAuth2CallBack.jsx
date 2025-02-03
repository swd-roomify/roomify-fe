import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthCallback = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const errorMessage = searchParams.get("errorrMessage");

    if (errorMessage) {
      alert(errorMessage);

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
    if (token) {
      // Lưu token và các thông tin liên quan
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      localStorage.setItem("role", decodedToken.roles);
      localStorage.setItem("username", decodedToken.sub);

      // Cập nhật trạng thái isLoggedIn
      setIsLoggedIn(true);

      // Điều hướng sang MenuPage
      navigate("/menu");
    } else {
      navigate("/login", { state: { error: "Authentication failed" } });
    }
  }, [navigate, searchParams, setIsLoggedIn]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl">Processing authentication...</div>
      </div>
    </div>
  );
};

export default AuthCallback;
