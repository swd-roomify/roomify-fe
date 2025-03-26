import React from 'react';
import '../../assets/style/css/homepage/about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <div className="about-video">
        <span>VIDEO PLACEHOLDER</span>
      </div>
      <div className="about-content">
        <h2>VIRTUAL - INTERACTIVE ZONE FOR YOUR COMMUNITY</h2>
        <p>Roomify brings the best experience in web-based communication for everyone.</p>
        <button onClick={() => navigate("/signup")} className="about-button">Get Started</button>
      </div>
    </div>
  );
};

export default About;
