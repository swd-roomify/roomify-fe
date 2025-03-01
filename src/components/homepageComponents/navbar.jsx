import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/style/css/homepage/navbar.css';

const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 100;
      setBgOpacity(Math.min(scrollY / maxScroll, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar" style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}>
      <div className="navbar-container">
        <span 
          className="logo" 
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          MyLogo
        </span>
        <div className="nav-buttons">
          <span onClick={() => scrollToSection("about")} className="btn btn-nav">
            About
          </span>
          <span onClick={() => scrollToSection("features")} className="btn btn-nav">
            Features
          </span>
          <span onClick={() => scrollToSection("contact")} className="btn btn-nav">
            Contact
          </span>
          <button onClick={() => navigate("/signin")} className="btn btn-login">Sign In</button>
          <button onClick={() => navigate("/signup")} className="btn btn-signup">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
