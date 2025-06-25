import { BrowserRouter, Routes, Route } from "react-router-dom";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SentimentAnalysis />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
