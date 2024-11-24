import "./Styles/GeneralStyles.css";
import NavbarComp from "../components/Navbar/NavbarComp";
import LanguageScoringComp from "../components/Functionalities/LanguageScoring/LanguageScoringComp";
import { ToastContainer } from "react-toastify";

function LanuageScoring() {
  return (
    <div className="text-to-image">
      <LanguageScoringComp />
      <NavbarComp />
      <ToastContainer/>
    </div>
  );
}

export default LanuageScoring;
