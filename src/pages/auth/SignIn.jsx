import { useState } from "react";
import "../../assets/style/css/signin.css";
import avatar1 from "/assets/sprites/character.png";
import avatar2 from "/assets/sprites/character2.png";
import avatar3 from "/assets/sprites/character3.png";
import { BASE_API_URL } from "@/constants/apiBaseUrlConstants";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Signed In!");
    }, 2000);
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
          <img
            src={avatar1}
            alt="avatar1"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <img
            src={avatar2}
            alt="avatar2"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
          <img
            src={avatar3}
            alt="avatar3"
            className="h-10 w-10 rounded-full border-2 border-gray-300"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-500">Roomify</span>
        </h2>

        <button
          onClick={() => handleOAuthSignIn("google")}
          className="w-full flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-lg mb-4 hover:bg-gray-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            className="mr-2"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="text-gray-500 text-sm mb-4">OR</p>

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
        />

        <button
          onClick={handleSignIn}
          className="signin-button w-full text-white py-3 rounded-lg flex items-center justify-center transition"
        >
          {loading ? (
            <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
}
