import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material";
import { RiInputCursorMove } from "react-icons/ri";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AOS from "aos";
import "aos/dist/aos.css";
import { getRandomPrompt } from "../../../Util/TextToImageRandomPrompt";
import CreatePost from "./ReusebleComps/CreatePost";
import Suggestions from "./ReusebleComps/Suggestions";

const Suggestionitems = [
  {
    key: 1,
    content: "Please Do not use controversial words in the prompt such as",
    material: [
      { key: 1, content: "ethnic." },
      { key: 2, content: "violent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 2,
    content: "For Better Experience, express the type of picture you want i.e",
    material: [
      { key: 1, content: "3d." },
      { key: 2, content: "oil painting." },
      { key: 3, content: "photograph." },
      { key: 4, content: "digital art." },
    ],
  },
  {
    key: 3,
    content: "To get a surprise prompt, hit the magic button next to the input.",
  },
];

export default function TextToImagePrompt() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState("");

  const handleChnage = (e) => {
    setPrompt(e.target.value);
  };

  const handleSurprise = (e) => {
    e.preventDefault();
    setPrompt(getRandomPrompt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setShowPrompt(prompt);
      setLoading(false);
      setPrompt("");
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
          Provide a suitable Prompt to change into{" "}
          <span style={{ color: "rgba(41, 51, 194, 0.829)", fontStyle: "italic" }}>
            Image
          </span>
        </Typography>

        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            mb: 4,
          }}
          data-aos="fade-right"
        >
          <Form>
            <InputGroup className="input-inputgroup">
              <InputGroup.Text id="basic-addon1">
                <RiInputCursorMove size={20} />
              </InputGroup.Text>
              <Form.Control
                as="input"
                placeholder="Enter a prompt OR refresh the page for a Surprise Me effect"
                value={prompt}
                id="prompt"
                name="prompt"
                onChange={handleChnage}
                required
                className="input-placeholder-self"
              />
              <InputGroup.Text id="basic-addon1" className="input-submit-sec-button">
                <IconButton
                  onClick={handleSurprise}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  <FaWandMagicSparkles size={20} />
                </IconButton>
              </InputGroup.Text>
            </InputGroup>

            <Box
              sx={{
                textAlign: "center",
                mt: 3,
              }}
              data-aos="fade-right"
            >
              <Button
                type="submit"
                variant="success"
                onClick={handleSubmit}
                sx={{
                  minWidth: "200px",
                  backgroundColor: "#28a745",
                  "&:hover": { backgroundColor: "#218838" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Generate"}
              </Button>
            </Box>
          </Form>
        </Box>

        <Suggestions Items={Suggestionitems} />
      </Box>

      {/* Output Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
        data-aos="fade-left"
      >
        <CreatePost newPrompt={showPrompt} />
      </Box>
    </Box>
  );
}
