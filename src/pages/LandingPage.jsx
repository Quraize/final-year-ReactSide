import './Styles/LandingPageStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import Intro from '../components/LandingPageComp/Intro/Intro';
import Evaluation from '../components/LandingPageComp/FuncIntroComp/Evaluation';
import Analysis from '../components/LandingPageComp/FuncIntroComp/Analysis';
import Conversion from '../components/LandingPageComp/FuncIntroComp/Conversion';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
  return (
    <div className='landing-page'>
        <Intro/>
        <Evaluation/>
        <Analysis/>
        <Conversion/>
        <Footer/>
        <NavbarComp/>
    </div>
  )
}
