import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/css/signup.css";
import { SignUpUtil } from "../../utils/AuthUtil";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !repeatPassword) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await SignUpUtil(username.trim(), email.trim(), password.trim());
      setSuccess("Sign-up successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      
      navigate("/signin");
    } catch (error) {
      setError("Sign-up failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-600 to-blue-400 relative">
      <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-20"></div>

      <div className="signup-form relative bg-white p-10 md:p-12 rounded-2xl w-full max-w-md text-center z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create an account on <span className="text-blue-500">Roomify</span>
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition-all"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition-all"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition-all"
        />

        <input
          type="password"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition-all"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 flex justify-center items-center transition-all hover:bg-green-600"
        >
          {loading ? (
            <span className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </div>
  );
}
