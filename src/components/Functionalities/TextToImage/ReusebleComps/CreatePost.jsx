/* eslint-disable react/prop-types */
import AnimationData1 from "../../../../assets/texttoimage.json";
import Loader from "../../../../assets/imageloader.json";
import Lottie from "lottie-react";
import "./CreatePostStyles.css";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePost({ newPrompt }) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

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

          const imageData = await response.json();
          setLoading(false);

          if (!response.ok || imageData.success === false) {
            // Show error toast if the generation fails
            toast.error(imageData.message || "Failed to generate image.");
            return;
          }

          // On success, update image state and show success toast
          setImage(`data:image/jpeg;base64,${imageData.photo}`);
          toast.success("Image generated successfully!");
        } catch (error) {
          setLoading(false);
          // Show error toast on fetch error
          toast.error(error.message || "An error occurred while generating image.");
        }
      }
    },
    [newPrompt]
  );

  useEffect(() => {
    handleGeneration();
  }, [handleGeneration, newPrompt]);

  return (
    <div>
      {loading ? (
        <Lottie animationData={Loader} className="create-post-preview" />
      ) : image ? (
        <img
          src={image}
          alt={newPrompt}
          width={650}
          height={650}
          className="create-post-image-self"
          data-aos="zoom-in"
        />
      ) : (
        <Lottie animationData={AnimationData1} className="create-post-preview" />
      )}
    </div>
  );
}
