import React, { useState, useMemo, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import AnimationData1 from "../../../../assets/texttoimage.json";
import Loader from "../../../../assets/imageloader.json";
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
            toast.error(imageData.message || "Failed to generate image.");
            return;
          }

          setImage(`data:image/jpeg;base64,${imageData.photo}`);
        } catch (error) {
          setLoading(false);
          toast.error(error.message || "An error occurred while generating the image.");
        }
      }
    },
    [newPrompt]
  );

  useEffect(() => {
    handleGeneration();
  }, [handleGeneration, newPrompt]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100%",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        backgroundColor: "transparent",
      }}
    >
      {loading ? (
        <Lottie animationData={Loader} />
      ) : image ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <img
            src={image}
            alt={newPrompt}
            width={450}
            height={450}
            style={{
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              objectFit: "cover",
              maxWidth: "100%",
            }}
            data-aos="zoom-in"
          />
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Prompt: {newPrompt}
          </Typography>
        </Box>
      ) : (
        <Lottie animationData={AnimationData1}/>
      )}
    </Box>
  );
}
