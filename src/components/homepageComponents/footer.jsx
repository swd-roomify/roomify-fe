import "../../assets/style/css/homepage/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src="/your-logo.png" alt="Logo" />
      </div>

      <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
