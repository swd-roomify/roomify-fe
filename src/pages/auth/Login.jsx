import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/css/signin.css";
import { SignInUtil } from "../../utils/AuthUtil";
import avatar1 from "/assets/sprites/character.png";
import avatar2 from "/assets/sprites/character2.png";
import avatar3 from "/assets/sprites/character3.png";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await SignInUtil(email, password);
      alert(`Logged in as: ${response.user.username}`);
      navigate("/room")
      
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
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
        <input
          type="text"
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
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
}
