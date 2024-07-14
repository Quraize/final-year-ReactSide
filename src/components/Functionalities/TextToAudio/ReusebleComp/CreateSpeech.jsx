/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import AnimationData1 from '../../../../assets/speaker.json';
import Loader from "../../../../assets/imageloader.json";
import './CreateSpeechStyles.css';
import { useEffect, useMemo, useState} from "react";
import b64toBlob from 'b64-to-blob';
import AlertMessage from "../../TextToImage/ReusebleComps/AlertMessage";

export default function CreateSpeech({Input}) {
  const [audio64, setAudio64] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setshowError] = useState(false);

  const handleSpeech = useMemo(
    ()=> async()=> {
    if(Input){
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/conversion/texttospeech",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Input),
          }
        );
        const audioData = await response.json();
        setLoading(false);
        if (audioData.success === false || audioData.status === 400) {
          setshowError(true);
          setErrorMessage(audioData.message);
          setTimeout(()=>{
            setshowError(false);
          }, 5000);
          return;
        }
        setAudio64(audioData.audio);
      } catch (error) {
        setshowError(true);
        setErrorMessage(error.message);
        setTimeout(()=>{
          setshowError(false);
        }, 5000);
      }
    }
  }, [Input])

  useEffect(()=>{
    handleSpeech();
  }, [handleSpeech, Input])

  useEffect(()=>{
      if(audio64){
        const contentType = 'audio/mp3';
        const base64Data = audio64;
        const blob = b64toBlob(base64Data, contentType);
        //create URL from Blob
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
        //cleanup URL obj after unmounting or changes
        return() => {
          URL.revokeObjectURL(url);
        };
      }
  }, [audio64]);


  return (
    <div>
     {showError && <div className="alert-message-sec"><AlertMessage Variant={'danger'} message={errorMessage}/></div>}
     {loading ? ( // Show loader when loading is true
        <Lottie animationData={Loader} className="text-to-speech-loading" />
      ) : audioSrc ? ( // Show image if available
        <audio controls src={audioSrc} className="text-to-speech-audio"/>
      ) : (
        // Show Lottie animation if no image or error
        <Lottie animationData={AnimationData1} className="text-to-speech-preview"/>
      )}
      
    </div>
  )
}

