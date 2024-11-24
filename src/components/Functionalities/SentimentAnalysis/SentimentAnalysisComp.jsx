import { useState, useEffect } from "react";
import "./SentimentAnalysisStyles.css";
import Form from "react-bootstrap/Form";
import Suggestions from "../TextToImage/ReusebleComps/Suggestions";
import CreateReport from "./ResusebleComp/CreateReport";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box,Button, CircularProgress} from "@mui/material";

const SuggestionItems = [
  {
    key: 1,
    content: "Please do not make in the Text such as",
    material: [
      { key: 1, content: "ethinic." },
      { key: 2, content: "voilent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 2,
    content: "This service is ONLY effective in ",
    material: [
      { key: 1, content: "English." },
      { key: 2, content: "English." },
    ],
  },
  {
    key: 3,
    content: "After hitting Genereate, Wait unitll you get some response. ",
  },
];

export default function SentimentAnalysisComp() {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const Data = {
        text: text,
        type: type,
      };
      setFormData(Data);
      setLoading(false);
      setText("");
      setType("");
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
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row layout for large
        width: "100%",
        height: "100vh", // Ensure it fills the viewport
        background:
          "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)", // Updated gradient
        overflow: "hidden", // Prevent scrolling
      }}
    >
       <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <h1
          className="sentiment-analysis-input-main-heading"
          data-aos="fade-right"
        >
          Provide suitable Comments/Messages to be{" "}
          <i className="sentiment-analysis-heading-italic">Analyzed</i>
        </h1>
        <div className="sentiment-analysis-input-self">
          <Form onSubmit={handleSubmit} data-aos="fade-right">
            <div className="sentiment-analysis-select-sec">
              <Form.Select id="type" value={type} onChange={handleTypeChange}>
                <option value="">Select Analysis type</option>
                <option value="sentiment">Sentiment Analysis</option>
                <option value="emotion">Emotional Analysis</option>
              </Form.Select>
            </div>
            <div className="sentiment-analysis-text-input">
              <Form.Control
                id="text"
                value={text}
                placeholder="Your comment(s) goes here"
                as={"textarea"}
                rows={2}
                onChange={handleTextChange}
                disabled={!type}
              />
            </div>
            <div className="sentiment-analysis-input-submit-sec">
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
              onClick={handleSubmit}
            >
              {Loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
            </div>
          </Form>
        </div>
        <div data-aos="fade-right">
          <Suggestions Items={SuggestionItems} />
        </div>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          px: { xs: 2, sm: 4, md: 6 },
        }}
        data-aos="fade-left"
      >
        <CreateReport Input={formData} />
      </Box>
    </Box>
  );
}
