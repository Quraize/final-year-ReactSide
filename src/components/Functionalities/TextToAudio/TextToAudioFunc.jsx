import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Form from "react-bootstrap/Form";
import Suggestions from "../TextToImage/ReusebleComps/Suggestions";
import CreateSpeech from "./ReusebleComp/CreateSpeech";
import AOS from "aos";
import "aos/dist/aos.css";

const SuggestionItems = [
  {
    key: 1,
    content: "Please do not make in the Text such as",
    material: [
      { key: 1, content: "ethnic." },
      { key: 2, content: "violent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 2,
    content: "This service is more effective on major world languages i.e.",
    material: [
      { key: 1, content: "English." },
      { key: 2, content: "Russian." },
      { key: 3, content: "Urdu." },
      { key: 4, content: "Hindi." },
      { key: 5, content: "Spanish." },
      { key: 6, content: "French." },
    ],
  },
  {
    key: 3,
    content: "After hitting Generate, wait until you get a response.",
  },
];

const languages = {
  urdu: {
    dispayName: "Urdu",
    speaker: [
      { name: "Male", value: "urdu_male" },
      { name: "Female", value: "urdu_female" },
    ],
  },
  hindi: {
    dispayName: "Hindi",
    speaker: [
      { name: "Male", value: "hindi_male" },
      { name: "Female", value: "hindi_female" },
    ],
  },
  en: {
    dispayName: "English",
    speaker: [
      { name: "Male", value: "en_12" },
      { name: "Female", value: "en_11" },
    ],
  },
  es: {
    dispayName: "Spanish",
    speaker: [
      { name: "Male", value: "es_0" },
      { name: "Female", value: "es_1" },
    ],
  },
  de: {
    dispayName: "German",
    speaker: [
      { name: "Male", value: "karlsson" },
      { name: "Female", value: "eva_k" },
    ],
  },
  fr: {
    dispayName: "French",
    speaker: [
      { name: "Male", value: "fr_1" },
      { name: "Female", value: "fr_4" },
    ],
  },
};

export default function TextToAudioFunc() {
  const [formData, setFormData] = useState(null);
  const [language, setLanguage] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [inputText, setInputText] = useState("");
  const [speakersEnabled, setSpeakersEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setSpeakersEnabled(selectedLanguage !== "");
    setSpeaker("");
    setSpeakerOptions(languages[selectedLanguage]?.speaker || []);
  };

  const handleSpeakerChange = (e) => {
    setSpeaker(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const data = {
        input_text: inputText,
        language: language,
        speaker: speaker,
      };
      setFormData(data);
      setLoading(false);
      setInputText("");
      setLanguage("");
      setSpeaker("");
    }, 1500);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out-back",
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
      }}
    >
      {/* Speech Output Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
        data-aos="fade-right"
      >
        <CreateSpeech Input={formData} />
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            color: "#333",
          }}
          data-aos="fade-left"
        >
          Provide suitable Text to change into{" "}
          <span style={{ color: "rgba(41, 51, 194, 0.829)", fontStyle: "italic" }}>
            Speech
          </span>
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          {/* Language and Speaker Selection */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 3,
            }}
            data-aos="fade-left"
          >
            <Form.Select id="language" value={language} onChange={handleLanguageChange}>
              <option value="">Select Language</option>
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>
                  {languages[lang].dispayName}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              id="speaker"
              value={speaker}
              onChange={handleSpeakerChange}
              disabled={!speakersEnabled}
            >
              <option value="">Select Speaker</option>
              {speakerOptions.map((speaker) => (
                <option key={speaker.value} value={speaker.value}>
                  {speaker.name}
                </option>
              ))}
            </Form.Select>
          </Box>

          {/* Text Area */}
          <Box
            sx={{
              mb: 3,
            }}
            data-aos="fade-left"
          >
            <Form.Control
              id="inputText"
              placeholder="Your text goes here."
              as="textarea"
              rows={4}
              value={inputText}
              onChange={handleInputChange}
              style={{
                width: "100%",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "1rem",
                resize: "none",
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
            data-aos="fade-left"
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#28a745",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
            </Button>
          </Box>
        </form>

        {/* Suggestions */}
        <Box data-aos="fade-left" sx={{ mt: 2 }}>
          <Suggestions Items={SuggestionItems} />
        </Box>
      </Box>
    </Box>
  );
}
