import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Check if user is actually logged in
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      // Call logout API
      await axios.post(
        "http://localhost:8081/api/v1/logout",
        {}, // empty body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      // Update app state
      setIsLoggedIn(false);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        fontSize: "14px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
