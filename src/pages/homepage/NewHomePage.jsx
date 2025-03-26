import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/homepageComponents/navbar';
import Footer from '@/components/homepageComponents/footer';
import '../../assets/style/css/homepage/homepage.css';

const NewHomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });

          window.history.replaceState(null, "", "/");
        }
      }, 100);
    }
  }, [location]);

  return (
    <div id="homepage-container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NewHomePage;
