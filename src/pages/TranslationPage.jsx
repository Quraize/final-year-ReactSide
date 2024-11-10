import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import TranslationComp from '../components/Functionalities/Translation/TranslationComp';

function TranslationPage() {
  return (
    <div className='text-to-image'>
      <TranslationComp/>
      <NavbarComp/>
    </div>
  )
}

export default TranslationPage
