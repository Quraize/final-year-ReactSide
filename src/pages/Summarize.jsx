import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import SummarizeComp from '../components/Functionalities/Summarize/SummarizeComp';
import { ToastContainer } from 'react-toastify';

function Summarize() {
  return (
    <div className='text-to-image'>
    <SummarizeComp/>
    <NavbarComp/>
    <ToastContainer/>
  </div>
  )
}

export default Summarize