/* eslint-disable react/prop-types */
import AnimationData1 from "../../../../assets/texttoimage.json";
import Loader from "../../../../assets/imageloader.json";
import AlertMessage from "./AlertMessage";
import Lottie from "lottie-react";
import "./CreatePostStyles.css";
import { useState, useMemo, useEffect } from "react";

export default function CreatePost({ newPrompt }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setshowError] = useState(false);
 
  // Use useMemo to trigger handlePost based on prompt changes
  const handleGeneration = useMemo(
    () => async () => {
      if (newPrompt) {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/conversion/texttoimg",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt: newPrompt }),
            }
          );

          const imageData = await response.json(); // Assuming response is JSON
          setLoading(false);
          if (imageData.success === false || imageData.status === 400) {
            setshowError(true);
            setErrorMessage(imageData.message);
            setTimeout(()=>{
              setshowError(false);
            }, 5000);
            return;
          }
          setImage(`data:image/jpeg;base64,${imageData.photo}`);
          // Update image state
        } catch (error) {
          setshowError(true);
          setErrorMessage(error.message);
          setTimeout(()=>{
            setshowError(false);
          }, 5000);
        }
      }
    },
    [newPrompt]
  );
 
  useEffect(() => {
    handleGeneration();
  }, [handleGeneration, newPrompt,]);
  return (
    <div>
      {showError && <div className="alert-message-sec"><AlertMessage Variant={'danger'} message={errorMessage}/></div>}
      {loading ? ( // Show loader when loading is true
        <Lottie animationData={Loader} className="create-post-preview" />
      ) : image ? ( // Show image if available
        <img
          src={image}
          alt={newPrompt}
          width={650}
          height={650}
          className="create-post-image-self"
          data-aos="zoom-in"
        />
      ) : (
        // Show Lottie animation if no image or error
        <Lottie
          animationData={AnimationData1}
          className="create-post-preview"
        />
      )}
        
    </div>
  );
}
