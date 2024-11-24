import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TextToImage from "./pages/TextToImage";
import TextToAudio from "./pages/TextToAudio";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import LanguageDetectPage from "./pages/LanguageDetectPage";
import TranslationPage from "./pages/TranslationPage";
import Summarize from "./pages/Summarize";
import LanuageScoring from "./pages/LanuageScoring";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/texttoimage" element={<TextToImage />} />
            <Route path="/texttospeech" element={<TextToAudio />} />
            <Route path="/sentimentanalysis" element={<SentimentAnalysis />} />
            <Route path="/languagedetect" element={<LanguageDetectPage />} />
            <Route path="/translation" element={<TranslationPage />} />
            <Route path="/summarization" element={<Summarize />} />
            <Route path="/scoring" element={<LanuageScoring />} />
          </Route>

          {/* Redirect unknown routes to Sign In */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
