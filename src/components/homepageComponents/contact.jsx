import React from 'react';
import { FaFacebookF, FaGithub } from "react-icons/fa"; 
import '../../assets/style/css/homepage/contact.css';

const teamMembers = [
  {
    name: "Đặng Quang Huy",
    job: "Frontend Developer",
    image: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    facebook: "https://www.facebook.com/h.ngquang",
    github: "https://github.com/h.ngquang",
  },
  {
    name: "Võ Ngọc Bảo Thư",
    job: "Backend Developer",
    image: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    facebook: "https://www.facebook.com/h.ngquang",
    github: "https://github.com/h.ngquang",
  },
  {
    name: "Nguyễn Hữu Phúc",
    job: "Backend Developer",
    image: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    facebook: "https://www.facebook.com/h.ngquang",
    github: "https://github.com/h.ngquang",
  },
  {
    name: "Nguyễn Công Minh Tuấn",
    job: "DevOps Engineer",
    image: "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
    facebook: "https://www.facebook.com/h.ngquang",
    github: "https://github.com/h.ngquang",
  },
];

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact Us?</h2>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Anything else?"></textarea>
          <button type="submit">Submit</button>
        </div>
        <div className="team-container">
          {teamMembers.map(member => (
            <div key={member.name} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.job}</p>
                  <div className="social-links">
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebookF className="icon" />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
