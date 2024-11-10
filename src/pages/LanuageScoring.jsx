import "./Styles/GeneralStyles.css";
import NavbarComp from "../components/Navbar/NavbarComp";
import LanguageScoringComp from "../components/Functionalities/LanguageScoring/LanguageScoringComp";

function LanuageScoring() {
  return (
    <div className="text-to-image">
      <LanguageScoringComp />
      <NavbarComp />
    </div>
  );
}

export default LanuageScoring;
