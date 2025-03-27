import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/css/signin.css";
import avatar1 from "/assets/sprites/character.png";
import avatar2 from "/assets/sprites/character2.png";
import avatar3 from "/assets/sprites/character3.png";
import { SignInUtil } from "@/utils/AuthUtil";
import { BASE_API_URL } from "@/constants/apiBaseUrlConstants";

const SignIn = ({ setIsLoggedIn }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const data = await SignInUtil(email, password);
      navigate("/room");
      window.location.reload();
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const backendUrl = `${BASE_API_URL}/oauth2/authorization`;
  const handleOAuthSignIn = (provider) => {
    window.location.href = `${backendUrl}/${provider}`;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-400 relative">
      <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-20"></div>
      <div className="login-form relative bg-white p-10 md:p-12 rounded-2xl w-full max-w-md text-center z-10">
        <div className="flex justify-center space-x-4 mb-6">
          <img src={avatar1} alt="avatar1" className="h-10 w-10 rounded-full border-2 border-gray-300" />
          <img src={avatar2} alt="avatar2" className="h-10 w-10 rounded-full border-2 border-gray-300" />
          <img src={avatar3} alt="avatar3" className="h-10 w-10 rounded-full border-2 border-gray-300" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-500">Roomify</span>
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

        <button
          onClick={() => handleOAuthSignIn("google")}
          className="w-full flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-lg mb-4 hover:bg-gray-50 transition"
        >
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="text-gray-500 text-sm mb-4">OR</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
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

export default SignIn;