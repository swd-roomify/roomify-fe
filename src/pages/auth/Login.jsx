import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignInUtil } from "../../utils/AuthUtil";
import avatar1 from "/assets/sprites/character.png";
import avatar2 from "/assets/sprites/character2.png";
import avatar3 from "/assets/sprites/character3.png";

const Login = ({ setIsLoggedIn }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/login/non-type",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        setIsLoggedIn(true);
        navigate("/menu");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-700 to-blue-300 relative">
      <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-30"></div>
      <div className="login-form relative bg-white p-20 rounded-2xl w-1/4 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <img src={avatar1} alt="avatar1" className="h-8" />
          <img src={avatar2} alt="avatar2" className="h-8" />
          <img src={avatar3} alt="avatar3" className="h-8" />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Welcome to <span className="text-blue-500">Roomify</span>
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
