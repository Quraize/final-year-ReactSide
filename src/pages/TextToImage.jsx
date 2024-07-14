import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import TextToImagePrompt from '../components/Functionalities/TextToImage/TextToImageFunc';

export default function TextToImage() {
  return (
    <div className="text-to-image">
        <TextToImagePrompt/>
        <NavbarComp/>
    </div>
  )
}
