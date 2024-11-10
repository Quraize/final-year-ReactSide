import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import Suggestions from '../TextToImage/ReusebleComps/Suggestions';
import AOS from "aos";
import "aos/dist/aos.css";
import ReportComp from './ReportComp/ReportComp';

const SuggestionItems = [
  {
    key: 1,
    content: "Your summary legnth must be smaller than your source text.",
  },
  {
    key: 2,
    content: "Please refrain from offensive comments, including",
    material: [
      { key: 1, content: "ethinic." },
      { key: 2, content: "voilent." },
      { key: 3, content: "racist." },
      { key: 4, content: "religious." },
    ],
  },
  {
    key: 3,
    content: "This service is mostly effective in language, ",
    material: [
      { key: 1, content: "English." },
    ],
  },
  {
    key: 4,
    content: "After hitting Genereate, Wait unitll you get some response. ",
  },
];


function SummarizeComp() {
  const [formData, setFormData] = useState(null);
  const [inputText, setInputText] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [minLength, setMinLength] = useState('');
  const [Loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleMaxLengthChange = (e) => {
    setMaxLength(Number(e.target.value));
  };

  const handleMinLengthChange = (e) => {
    setMinLength(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const Data = {
        article: inputText,
        maxLength: maxLength,
        minLength: minLength,
      };
      setFormData(Data);
      setLoading(false);
      setInputText('');
      setMaxLength('');
      setMinLength('');
    }, 1500);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out-back",
    });
  }, []);

  return (
    <div className="text-to-speech-func-main-sec">
      <div className="text-to-speech-create-sec" data-aos="fade-right">
        <ReportComp Input={formData} />
      </div>
      <div className="text-to-speech-input-sec">
        <h1 className="text-to-speech-input-main-heading" data-aos="fade-left">
          Provide suitable Text to change into{" "}
          <i className="text-to-speech-heading-italic">Speech</i>
        </h1>
        <div className="text-to-speech-input-self">
          <Form onSubmit={handleSubmit} data-aos="fade-left">
            <div className="text-to-speech-selection-sec">
              <div className="length-input-sef">
                <Form.Control
                  type="number"
                  id="maxLength"
                  placeholder="Maximum Length"
                  value={maxLength}
                  onChange={handleMaxLengthChange}
                />
              </div>
              <div className="length-input-sef">
                <Form.Control
                  type="number"
                  id="minLength"
                  placeholder="Minimum Length"
                  value={minLength}
                  onChange={handleMinLengthChange}
                />
              </div>
            </div>
            <div className="text-to-speech-input-self">
              <Form.Control
                id="inputText"
                placeholder="Your text goes here."
                as="textarea"
                rows={3}
                value={inputText}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-to-speech-input-submit-sec">
              <Button
                type="button"
                variant="success"
                onClick={handleSubmit}
                data-aos="fade-left"
              >
                {Loading ? "Sending Request.." : "Generate"}
              </Button>
            </div>
          </Form>
        </div>
        <div data-aos="fade-left">
          <Suggestions Items={SuggestionItems} />
        </div>
      </div>
    </div>
  );
}

export default SummarizeComp