import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TextToImage from "./pages/TextToImage";
import TextToAudio from "./pages/TextToAudio";
import SentimentAnalysis from "./pages/SentimentAnalysis";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
