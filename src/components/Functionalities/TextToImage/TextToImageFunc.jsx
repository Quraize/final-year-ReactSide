import "./ConversionStyles.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { RiInputCursorMove } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaWandMagicSparkles } from "react-icons/fa6";
import Button from "react-bootstrap/esm/Button";
import { getRandomPrompt } from "../../../Util/TextToImageRandomPrompt";
import CreatePost from "./ReusebleComps/CreatePost";
import Suggestions from "./ReusebleComps/Suggestions";

const Suggestionitems = [
  {
      key: 1,
      content: 'Please Do not use controversial words in the prompt such as',
      material: [{key:1, content:'ethinic.'}, {key:2, content:'voilent.'}, {key:3, content:'racist.'}, {key:4, content:'religious.'}]
  },
  {
      key: 2,
      content: 'For Better Experience, express the type of picture you want i.e',
      material: [{key:1, content:'3d.'}, {key:2, content:'oil painting.'}, {key:3, content:'photograph.'}, {key:4, content:'digital art.'}]
  },
  {
      key:3,
      content: 'To get a surprise prompt, hit the magic button next to the input.',
  }
]

export default function TextToImagePrompt() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  let [shoWPrompt, setShowPrompt] = useState("");
  //getting the prompt from the form component, child to parent
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
    <div className="conversion-main-sec">
      <div className="conversion-form-sec">
        <h1 className="main-heading" data-aos="fade-right">
          Provide a suitable Prompt to change into{" "}
          <i className="heading-italic">Image</i>
        </h1>
        <div className="input-main-sec">
          <Form data-aos="fade-right">
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
              <InputGroup.Text
                id="basic-addon1"
                className="input-submit-sec-button"
              >
                <button
                  type="button"
                  className="input-surprise-button"
                  onClick={handleSurprise}
                >
                  <FaWandMagicSparkles size={25} />
                </button>
              </InputGroup.Text>
            </InputGroup>

            <div className="input-surprise-sec" data-aos="fade-right">
              <Button
                type="button"
                variant="success"
                className="input-surprise-button"
                onClick={handleSubmit}
              >
                {loading ? "Sending Request.." : "Generate"}
              </Button>
            </div>
          </Form>
        </div>
        <Suggestions Items={Suggestionitems}/>
      </div>
      <div className="conversion-create-post-sec">
        <CreatePost newPrompt={shoWPrompt} />
      </div>
    </div>
  );
}
