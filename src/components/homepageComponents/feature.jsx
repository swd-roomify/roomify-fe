import React from 'react';
import '../../assets/style/css/homepage/feature.css';

const features = [
  {

    title: "Interactive virtual game",
    description: "Enhance team engagement with built-in interactive virtual games designed for fun breaks, team bonding, and stress relief.",
    image: "../../../public/assets/images/virtualGame.png",
  },
  {
    title: "Customizeable, Decorative Rooms",
    description: "Personalize your virtual office with customizable rooms that reflect your brand and work culture.",
    image: "../../../public/assets/images/decorativeRoom.png"
  },
  {
    title: "Set virtual events",
    description: "Plan and host virtual events effortlessly within your office space.",
    image: "../../../public/assets/images/virtualEvent.jpg",

  },
];

const Feature = () => {
  return (
    <div className="feature-section">
      <h2 className="feature-heading">Our Features</h2>
      <div className="feature-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="feature-image-container">
              <img src={feature.image} alt={feature.title} className="feature-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
