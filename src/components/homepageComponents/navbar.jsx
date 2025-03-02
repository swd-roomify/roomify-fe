import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/css/homepage/navbar.css";

const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 100;
      const opacity = Math.min(scrollY / maxScroll, 1);
      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar" style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}>
      <div className="navbar-container">
        <span className="logo" onClick={handleLogoClick}>
          MyLogo
        </span>

        <div className="nav-buttons">
          <span onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })} className="btn btn-nav">
            About
          </span>
          <span onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })} className="btn btn-nav">
            Features
          </span>
          <span onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} className="btn btn-nav">
            Contact
          </span>
          <button onClick={() => navigate("/signin")} className="btn btn-login">Sign In</button>
          <button onClick={() => navigate("/login")} className="btn btn-login">Login</button>
          <button onClick={() => navigate("/signup")} className="btn btn-signup">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
