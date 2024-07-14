import { useState } from 'react';
import './SentimentAnalysisStyles.css';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import Suggestions from '../TextToImage/ReusebleComps/Suggestions';
import CreateReport from './ResusebleComp/CreateReport';

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

export default function SentimentAnalysisComp() {
    const [text, setText] = useState('')
    const [type, setType] = useState('')
    const [Loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        setTimeout(()=>{
          const Data = {
            text: text,
            type: type,
          };
          setFormData(Data);
          setLoading(false);
          setText("");
          setType("");
        }, 1500)

    }
    return (
        <div className="sentiment-analysis-main-sec">
            <div className="sentiment-analysis-input-sec">
                <h1 className="sentiment-analysis-input-main-heading">
                    Provide suitable Comments/Messages to be{" "}
                    <i className="sentiment-analysis-heading-italic">Analyzed</i>
                </h1>
                <div className='sentiment-analysis-input-self'>
                    <Form onSubmit={handleSubmit}>
                        <div className='sentiment-analysis-select-sec'>
                            <Form.Select id='type' value={type} onChange={handleTypeChange}>
                                <option value="">Select Analysis type</option>
                                <option value="sentiment">Sentiment Analysis</option>
                                <option value="emotion">Emotional Analysis</option>
                                <option value="hate_speech">Hate Speech</option>
                            </Form.Select>
                        </div>
                        <div className='sentiment-analysis-text-input'>
                        <Form.Control
                            id='text'
                            value={text}
                            placeholder='Your comment(s) goes here'
                            as={'textarea'}
                            rows={2}
                            onChange={handleTextChange}
                            disabled={!type}
                        />
                        </div>
                        <div className='sentiment-analysis-input-submit-sec'>
                        <Button type="button" variant="success" onClick={handleSubmit}>
                            {Loading ? "Sending Request..": "Submit"}
                        </Button>
                        </div>
                    </Form>
                </div>
                <div>
                    <Suggestions Items={SuggestionItems}/>
                </div>
            </div>
            <div className="sentiment-analysis-report-sec">
                <CreateReport Input={formData}/>
            </div>
        </div>
    )
}
