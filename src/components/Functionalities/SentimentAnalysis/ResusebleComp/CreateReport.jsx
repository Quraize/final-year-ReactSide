/* eslint-disable react/prop-types */
import './CreateReportStyles.css';
import AnimationData1 from '../../../../assets/sentiinput.json';
import Lottie from 'lottie-react';
import Loader from '../../../../assets/imageloader.json'
import { useEffect, useMemo, useState } from 'react';
import AlertMessage from '../../TextToImage/ReusebleComps/AlertMessage';
import ReportUI from './ReportUI';

export default function CreateReport({ Input }) {
    const redArr = ['NEG', 'anger', 'disgust', 'hateful', 'targeted', 'aggressive', 'disappointment', 'disapproval', 'disgust', 'fear', 'grief'];
    const greenArr = ['POS', 'joy', 'admiration', 'amusement', 'approval', 'caring', 'excitement', 'gratitude', 'love', 'optimism', 'relief'];
    const blueArr = ['NEU', 'neutral', 'surprise', 'confusion', 'curiosity', 'desire', 'embarrassment', 'nervousness', 'pride', 'realization', 'remorse', 'sadness']
    const [basicResult, setBasicResult] = useState('');
    const [score, setScore] = useState(null)
    const [Loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setshowError] = useState(false);

    const handleReport = useMemo(
        () => async () => {
            if (Input) {
                try {
                    setLoading(true);
                    const response = await fetch(
                        "http://localhost:8000/analysis/sentiment",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(Input),
                        }
                    )

                    const reportData = await response.json();
                    setLoading(false);
                    if (reportData.success === false || reportData.status === 400) {
                        setshowError(true);
                        setErrorMessage(reportData.message);
                        setTimeout(() => {
                            setshowError(false);
                        }, 5000)
                        return;
                    }
                    setBasicResult(reportData.result.output)
                    setScore(reportData.result.probas)
                   
                } catch (error) {
                    setshowError(true);
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setshowError(false);
                    }, 5000);
                }
            }
        }
        , [Input])

        console.log(score)

    useEffect(() => {
        handleReport();
    }, [handleReport, Input])

    return (
        <div>
            {showError && <div className='report-alert-message-sec'><AlertMessage Variant={'danger'} message={errorMessage} /></div>}
            {Loading ? ( // Show loader when loading is true
                <Lottie animationData={Loader} className="text-to-speech-loading" />
            ) : basicResult ? (
                <div className='report-self'>
                    {redArr.includes(basicResult) ? (
                        <ReportUI basicResult={basicResult} scoreObj={score} sentiCheck={'NEG'} sentiCheckShow={'Negative'} variant={'danger'}/>
                    ) : greenArr.includes(basicResult) ? (
                        <ReportUI basicResult={basicResult} scoreObj={score} sentiCheck={'POS'} sentiCheckShow={'Positive'} variant={'success'}/>
                    ) : blueArr.includes(basicResult) ? (
                        <ReportUI basicResult={basicResult} scoreObj={score} sentiCheck={'NEU'} sentiCheckShow={'Neutral'} variant={'success'}/>
                    ) : (
                        <ReportUI basicResult={basicResult} scoreObj={score} sentiCheck={''} sentiCheckShow={''} variant={'secondary'}/>
                    )}
                </div>
            ) : (
                // Show Lottie animation if no image or error
                <Lottie animationData={AnimationData1} className="report-animation-data-preview" />
            )}
        </div>
    )
}
