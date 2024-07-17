import CreateSpeech from "./ReusebleComp/CreateSpeech";
import "./TextToAudioFuncStyles.css";
import Form from "react-bootstrap/Form";
import Suggestions from "../TextToImage/ReusebleComps/Suggestions";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    content: "This service is more effective on major world languages i.e. ",
    material: [
      { key: 1, content: "English." },
      { key: 2, content: "Russian." },
      { key: 3, content: "Urdu." },
      { key: 4, content: "Hindi." },
      { key: 4, content: "Spanish." },
      { key: 4, content: "French." },
    ],
  },
  {
    key: 3,
    content: "After hitting Genereate, Wait unitll you get some response. ",
  },
];

export default function TextToAudioFunc() {
  const [formData, setFormData] = useState(null);
  const [language, setLanguage] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [inputText, setInputText] = useState('');
  const [speakersEnabled, setSpeakersEnabled] = useState(false);
  const [Loading, setLaoding] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([])//state to store speaker options

  const languages = {
    urdu: {
      dispayName: 'Urdu',
      speaker: [
        { name: "Male", value: 'hindi_male' },
        { name: "Female", value: 'hindi_female' }
      ]
    },
    hindi: {
      dispayName: 'Hindi',
      speaker: [
        { name: "Male", value: 'hindi_male' },
        { name: "Female", value: 'hindi_female' }
      ]
    },
    en: {
      dispayName: 'English',
      speaker: [
        { name: "Male", value: 'en_12' },
        { name: "Female", value: 'en_11' }
      ]
    },
    es: {
      dispayName: 'Spanish',
      speaker: [
        { name: "Male", value: 'es_99' },
        { name: "Female", value: 'es_98' }
      ]
    },
    de: {
      dispayName: 'German',
      speaker: [
        { name: "Male", value: 'karlsson' },
        { name: "Female", value: 'eva_k' }
      ]
    },
    fr: {
      dispayName: 'French',
      speaker: [
        { name: "Male", value: 'fr_0' },
        { name: "Female", value: 'fr_7' }
      ]
    },
  }

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setSpeakersEnabled(selectedLanguage !== '');
    setSpeaker('');
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
    setLaoding(true);
    setTimeout(() => {
      const Data = {
        input_text: inputText,
        language: language,
        speaker: speaker,
      };
      setFormData(Data);
      setLaoding(false);
      setInputText('');
      setLanguage("");
      setSpeaker('');
    }, 1500)
    // Here you can handle form submission, like sending data to an API or updating state
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
        <CreateSpeech Input={formData} />
      </div>
      <div className="text-to-speech-input-sec">
        <h1 className="text-to-speech-input-main-heading" data-aos="fade-left">
          Provide suitable Text to change into{" "}
          <i className="text-to-speech-heading-italic">Speech</i>
        </h1>
        <div className="text-to-speech-input-self">
          <Form onSubmit={handleSubmit} data-aos="fade-left">
            <div className="text-to-speech-selection-sec">
              <div className="lanuage-select-sef">
                <Form.Select id="language" value={language} onChange={handleLanguageChange}>
                  <option value="">Select Language</option>
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang}>{languages[lang].dispayName}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="speaker-select-sef">
                <Form.Select id="speaker" value={speaker} onChange={handleSpeakerChange} disabled={!speakersEnabled}>
                  <option value="">Select Speaker</option>
                  {speakerOptions.map((speaker) => (
                    <option key={speaker.value} value={speaker.value}>{speaker.name}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="text-to-speech-input-self">
              <Form.Control id="inputText" placeholder="Your text goes here." as={"textarea"} rows={3} value={inputText} onChange={handleInputChange} />
            </div>
            <div className="text-to-speech-input-submit-sec">
              <Button type="button" variant="success" onClick={handleSubmit} data-aos="fade-left">
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
