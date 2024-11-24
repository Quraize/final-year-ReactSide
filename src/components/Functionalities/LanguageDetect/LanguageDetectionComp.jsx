import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Form from "react-bootstrap/Form";
import Suggestions from "../TextToImage/ReusebleComps/Suggestions";
import AOS from "aos";
import "aos/dist/aos.css";
import CreateReport from "./ReusebleComp/CreateReport";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuggestionItems = [
  {
    key: 1,
    content: "Please refrain from offensive comments, including",
    material: [
      { key: 1, content: "ethnic." },
      { key: 2, content: "violent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 2,
    content: "After hitting Generate, wait until you get a response.",
  },
];

function LanguageDetectionComp() {
  const [texts, setTexts] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleTextChange = (e) => {
    setTexts(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texts) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const textsArray = texts.split("\n").filter((text) => text.trim() !== "");
      const Data = {
        texts: textsArray,
      };
      setFormData(Data);
      setLoading(false);
      setTexts("");
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
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on larger screens
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
      }}
    >
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
          data-aos="fade-right"
        >
          Provide suitable Comments/Messages for{" "}
          <span style={{ color: "rgba(41, 51, 194, 0.829)", fontStyle: "italic" }}>
            Language Detection
          </span>
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          <Box
            sx={{
              mb: 3,
            }}
            data-aos="fade-right"
          >
            <Form.Control
              id="text"
              placeholder="Your comment(s) goes here"
              as="textarea"
              rows={4}
              onChange={handleTextChange}
              value={texts}
              style={{
                width: "100%",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "1rem",
                resize: "none",
              }}
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
            data-aos="fade-right"
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                minWidth: "200px",
                backgroundColor: "#28a745", // Bootstrap's green button color
                "&:hover": {
                  backgroundColor: "#218838", // Darker shade for hover
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
          </Box>
        </form>
        <Box data-aos="fade-right" sx={{ mt: 2 }}>
          <Suggestions Items={SuggestionItems} />
        </Box>
      </Box>

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
        data-aos="fade-left"
      >
        <CreateReport Input={formData} />
      </Box>
    </Box>
  );
}

export default LanguageDetectionComp;
