import Navbar from '../../components/homepageComponents/navbar';
import '../../assets/style/css/homepage/homepage.css';
import About from '@/components/homepageComponents/about';
import Contact from '@/components/homepageComponents/contact';
import Feature from '@/components/homepageComponents/feature';
import Footer from '@/components/homepageComponents/footer';

const HomePage = () => {
    return (
        <div id='homepage-container'>
            <Navbar />
            <section id="about">
                <About />
            </section>
            <section id="features">
                <Feature />
            </section>
            <section id="contact">
                <Contact />
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;