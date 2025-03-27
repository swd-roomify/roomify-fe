import React from 'react';
import '../../assets/style/css/homepage/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div 
        className="footer-logo" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src="/assets/images/globe.png" alt="Logo" />
      </div>
      <p>© {new Date().getFullYear()} Roomify. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
