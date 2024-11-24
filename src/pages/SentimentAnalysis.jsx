import './Styles/GeneralStyles.css';
import NavbarComp from '../components/Navbar/NavbarComp';
import SentimentAnalysisComp from '../components/Functionalities/SentimentAnalysis/SentimentAnalysisComp';
import { ToastContainer } from 'react-toastify';

export default function SentimentAnalysis() {
  return (
    <div className='text-to-image'>

           <SentimentAnalysisComp/>
            <NavbarComp/>
            <ToastContainer/>
    </div>
  )
}
