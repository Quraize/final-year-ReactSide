import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import SummarizeComp from '../components/Functionalities/Summarize/SummarizeComp';

function Summarize() {
  return (
    <div className='text-to-image'>
    <SummarizeComp/>
    <NavbarComp/>
  </div>
  )
}

export default Summarize