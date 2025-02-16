import { useState } from "react";
import { SignUpUtil } from "../../utils/AuthUtil"; 
import "../../assets/style/css/signup.css";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const response = await SignUpUtil(username.trim(), email.trim(), password.trim());
      setSuccess("Sign-up successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      setError("Sign-up failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-700 to-blue-300 relative">
      <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-30"></div>

      <div className="signup-form relative bg-white p-10 rounded-2xl w-1/4 text-center shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Create an account on <span className="text-blue-500">Roomify</span>
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <input
          type="password"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </div>
  );
}
