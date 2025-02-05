import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/css/homepage/navbar.css";

const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300; // Adjust this value to control how dark it gets
      const opacity = Math.min(scrollY / maxScroll, 1); // Ensures opacity doesn't exceed 1
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
          <Link to="/about" className="btn btn-nav">About</Link>
          <Link to="/features" className="btn btn-nav">Features</Link>
          <Link to="/contact" className="btn btn-nav">Contact</Link>
          <Link to="/signup" className="btn btn-signup">Get Started</Link>
          <Link to="/login" className="btn btn-login">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
