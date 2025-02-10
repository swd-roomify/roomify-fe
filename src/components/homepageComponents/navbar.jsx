import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/css/homepage/navbar.css";

const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

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

  return (
    <nav className="navbar" style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          MyLogo
        </Link>

        <div className="nav-buttons">
          <a href="#about" className="btn btn-nav">About</a>
          <a href="#features" className="btn btn-nav">Features</a>
          <a href="#contact" className="btn btn-nav">Contact</a>
          <Link to="/signin" className="btn btn-login">Sign In</Link>
          <Link to="/signup" className="btn btn-signup">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
