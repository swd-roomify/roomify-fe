import "../../assets/style/css/homepage/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-video">
        <img src='../../../public/assets/images/front.jpg'></img>
      </div>

      <div className="about-content">
        <h2>VIRTUAL - INTERACTIVE ZONE FOR YOUR COMMUNITY</h2>
        <p>Roomify brings the best experience in web-based communication for everyone.</p>
        <button className="about-button">Get Started</button>
      </div>
    </div>
  );
};

export default About;
