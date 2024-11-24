import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import TextToAudioFunc from '../components/Functionalities/TextToAudio/TextToAudioFunc';
import { ToastContainer } from 'react-toastify';

export default function TextToAudio() {
  return (
    <div className='text-to-image'>
        <TextToAudioFunc/>
        <NavbarComp/>
        <ToastContainer/>
    </div>
  )
}
