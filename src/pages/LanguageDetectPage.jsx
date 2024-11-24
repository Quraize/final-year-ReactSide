import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import LanguageDetectionComp from '../components/Functionalities/LanguageDetect/LanguageDetectionComp';
import { ToastContainer } from 'react-toastify';

function LanguageDetectPage() {
  return (
    <div className='text-to-image'>
      <LanguageDetectionComp/>
      <NavbarComp/>
      <ToastContainer />
    </div>
  )
}

export default LanguageDetectPage
