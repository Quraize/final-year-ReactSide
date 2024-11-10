import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TextToImage from "./pages/TextToImage";
import TextToAudio from "./pages/TextToAudio";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import LanguageDetectPage from "./pages/LanguageDetectPage";
import TranslationPage from "./pages/TranslationPage";
import Summarize from "./pages/Summarize";
import LanuageScoring from "./pages/LanuageScoring";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/texttoimage" element={<TextToImage/>}/>
          <Route path="/texttospeech" element={<TextToAudio/>}/>
          <Route path="/sentimentanalysis" element={<SentimentAnalysis/>}/>
          <Route path="/languagedetect" element={<LanguageDetectPage/>}/>
          <Route path="/translation" element={<TranslationPage/>}/>
          <Route path="/summarization" element={<Summarize/>}/>
          <Route path="/scoring" element={<LanuageScoring/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
