/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import AnimationData1 from '../../../../assets/speaker.json';
import Loader from "../../../../assets/imageloader.json";
import './CreateSpeechStyles.css';
import { useEffect, useMemo, useState } from "react";
import b64toBlob from 'b64-to-blob';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateSpeech({ Input }) {
  const [audio64, setAudio64] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeech = useMemo(
    () => async () => {
      if (Input) {
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

          if (!response.ok || audioData.success === false) {
            // Trigger error toast if response indicates failure
            toast.error(audioData.message || "Failed to generate audio.");
            return;
          }

          // If successful, set audio data and trigger success toast
          setAudio64(audioData.audio);
          toast.success("Audio generated successfully!");
        } catch (error) {
          setLoading(false);
          // Trigger error toast on fetch error
          toast.error(error.message || "An error occurred while generating audio.");
        }
      }
    },
    [Input]
  );

  useEffect(() => {
    handleSpeech();
  }, [handleSpeech, Input]);

  useEffect(() => {
    if (audio64) {
      const contentType = 'audio/mp3';
      const blob = b64toBlob(audio64, contentType);
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);

      // Cleanup URL object on unmount
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audio64]);

  return (
    <div>
      {loading ? (
        <div><Lottie animationData={Loader} className="text-to-speech-loading" /></div>
      ) : audioSrc ? (
        <audio controls src={audioSrc} className="text-to-speech-audio" />
      ) : (
        <Lottie animationData={AnimationData1} className="text-to-speech-preview" />
      )}
    </div>
  );
}
