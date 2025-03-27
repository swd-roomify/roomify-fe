import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../assets/style/css/homepage/navbar.css';

const Navbar = () => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra user trong localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    if (location.pathname !== "/") {
      navigate(`/?scrollTo=${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_expiration");
    setUser(null);
    navigate("/");
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
          ROOMIFY
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

          {user ? (
            <div className="user-dropdown">
              <span 
                className="btn btn-user" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.email}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <span className="dropdown-item" onClick={() => navigate("/profile")}>
                    Profile
                  </span>
                  <span className="dropdown-item" onClick={() => navigate("/room")}>
                    Rooms
                  </span>
                  <span className="dropdown-item logout" onClick={handleLogout}>
                    Sign Out
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate("/signin")} className="btn btn-login">
                Sign In
              </button>
              <button onClick={() => navigate("/signup")} className="btn btn-signup">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
