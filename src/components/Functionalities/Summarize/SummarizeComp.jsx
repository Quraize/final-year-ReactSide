import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Divider } from "@mui/material";
import Form from "react-bootstrap/Form";
import AOS from "aos";
import "aos/dist/aos.css";
import Suggestions from "../TextToImage/ReusebleComps/Suggestions";
import ReportComp from "./ReportComp/ReportComp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuggestionItems = [
  {
    key: 1,
    content: "Your summary length must be smaller than your source text.",
  },
  {
    key: 2,
    content: "Please refrain from offensive comments, including",
    material: [
      { key: 1, content: "ethnic." },
      { key: 2, content: "violent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 3,
    content: "This service is mostly effective in the language, ",
    material: [{ key: 1, content: "English." }],
  },
  {
    key: 4,
    content: "After hitting Generate, wait until you get some response.",
  },
];

function SummarizeComp() {
  const [formData, setFormData] = useState(null);
  const [inputText, setInputText] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [minLength, setMinLength] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Update word count dynamically
  useEffect(() => {
    const words = inputText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setMaxLength(words.length); // Max length = total words
    setMinLength(Math.floor(words.length / 2)); // Min length = half the total words
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) {
      toast.error("Please provide some text to summarize.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const Data = {
        article: inputText,
        maxLength: maxLength,
        minLength: minLength,
      };
      setFormData(Data);
      setLoading(false);
      setInputText("");
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
      {/* Report Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
        data-aos="fade-right"
      >
        <ReportComp Input={formData} />
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
          mt: 5
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
          Provide suitable Text to be{" "}
          <span style={{ color: "rgba(41, 51, 194, 0.829)", fontStyle: "italic" }}>
            Summarized
          </span>
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          {/* Word Count */}
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
              color: "#555",
            }}
            data-aos="fade-left"
          >
            <Typography variant="subtitle1">
              Total Words: <strong>{wordCount}</strong>
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#777" }}>
              Maximum Length: <strong>{maxLength}</strong> | Minimum Length:{" "}
              <strong>{minLength}</strong>
            </Typography>
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
              size="large"
              sx={{
                minWidth: "200px",
                backgroundColor: "#28a745", // Green button color
                "&:hover": {
                  backgroundColor: "#218838", // Darker green on hover
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
            </Button>
          </Box>
        </form>

        {/* Suggestions */}
        <Box data-aos="fade-left" sx={{ mt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Suggestions Items={SuggestionItems} />
        </Box>
      </Box>
    </Box>
  );
}

export default SummarizeComp;
