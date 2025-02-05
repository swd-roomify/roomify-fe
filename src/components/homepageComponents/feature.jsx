import "../../assets/style/css/homepage/feature.css";

const Feature = () => {
  const features = [
    {
      title: "Feature One",
      description: "This is a short description of the first feature.",
    },
    {
      title: "Feature Two",
      description: "An overview of what the second feature offers.",
    },
    {
      title: "Feature Three",
      description: "Highlights of the third feature in action.",
    },
  ];

  return (
    <div className="feature-section">
      <h2 className="feature-heading">Our Features</h2>
      <div className="feature-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="video-placeholder">
              <p>Video Placeholder</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
