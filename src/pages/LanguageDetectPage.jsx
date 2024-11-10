import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import LanguageDetectionComp from '../components/Functionalities/LanguageDetect/LanguageDetectionComp';

function LanguageDetectPage() {
  return (
    <div className='text-to-image'>
      <LanguageDetectionComp/>
      <NavbarComp/>
    </div>
  )
}

export default LanguageDetectPage
