import Navbar from '../../components/homepageComponents/navbar';
import '../../assets/style/css/homepage/homepage.css';
import About from '@/components/homepageComponents/about';
import Contact from '@/components/homepageComponents/contact';
import Feature from '@/components/homepageComponents/feature';
import Footer from '@/components/homepageComponents/footer';

const NewHomePage = () => {
    return (
        <div id='homepage-container'>
            <Navbar />
            <About />
            <Feature />
            <Contact />
            <Footer />
        </div>
    );
};

export default NewHomePage;
