import { useState, useEffect } from "react";
import "./LanuageDetectionStyles.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
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
  const [Loading, setLoading] = useState(false);
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
      // Split input into an array based on newlines or other delimiters
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
    <div className="detect-analysis-main-sec">
      <div className="detect-analysis-input-sec">
        <h1 className="detect-analysis-input-main-heading" data-aos="fade-right">
          Provide suitable Comments/Messages for{" "}
          <i className="detect-analysis-heading-italic">Language Detection</i>
        </h1>
        <div className="detect-analysis-input-self">
          <Form onSubmit={handleSubmit} data-aos="fade-right">
            <div className="detect-analysis-text-input">
              <Form.Control
                id="text"
                placeholder="Your comment(s) goes here"
                as="textarea"
                rows={2}
                onChange={handleTextChange}
                value={texts}
              />
            </div>
            <div className="detect-analysis-input-submit-sec">
              <Button
                type="button"
                variant="success"
                onClick={handleSubmit}
                data-aos="fade-right"
              >
                {Loading ? "Sending Request.." : "Submit"}
              </Button>
            </div>
          </Form>
        </div>
        <div data-aos="fade-right">
          <Suggestions Items={SuggestionItems} />
        </div>
      </div>
      <div className="detect-analysis-report-sec" data-aos="fade-left">
        <CreateReport Input={formData} />
      </div>
    </div>
  );
}

export default LanguageDetectionComp;
