import React, { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportUI from "./ReportUI";
import LoaderAnimation from "../../../../assets/imageloader.json";
import DataPreviewAnimation from "../../../../assets/emotion.json";

export default function CreateReport({ Input }) {
  const redArr = [
    "NEG",
    "anger",
    "disgust",
    "hateful",
    "targeted",
    "aggressive",
    "disappointment",
    "disapproval",
    "disgust",
    "fear",
    "grief",
  ];
  const greenArr = [
    "POS",
    "joy",
    "admiration",
    "amusement",
    "approval",
    "caring",
    "excitement",
    "gratitude",
    "love",
    "optimism",
    "relief",
  ];
  const blueArr = [
    "NEU",
    "neutral",
    "surprise",
    "confusion",
    "curiosity",
    "desire",
    "embarrassment",
    "nervousness",
    "pride",
    "realization",
    "remorse",
    "sadness",
  ];

  const [basicResult, setBasicResult] = useState("");
  const [score, setScore] = useState(null);
  const [Loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input) {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:8000/analysis/sentiment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Input),
          });

          const reportData = await response.json();
          setLoading(false);

          if (!response.ok || reportData.success === false) {
            toast.error(reportData.message || "Failed to fetch report data.");
            return;
          }

          setBasicResult(reportData.result.output);
          setScore(reportData.result.probas);
        } catch (error) {
          setLoading(false);
          toast.error(error.message || "An error occurred while generating the report.");
        }
      }
    },
    [Input]
  );

  useEffect(() => {
    handleReport();
  }, [handleReport, Input]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 }, // Dynamic padding for different screen sizes
        py: { xs: 3, sm: 4 },
      }}
    >
      {Loading ? (
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            maxWidth: { xs: "90%", sm: "75%", md: "600px" }, // Responsive loader container
          }}
        >
          <Lottie animationData={LoaderAnimation} />
        </Box>
      ) : basicResult ? (
        <Box
          sx={{
            mt: { xs: 4, sm: 6 }, // Adjust margin-top for small screens
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            width: "100%",
            maxWidth: { xs: "90%", sm: "75%", md: "900px" }, // Adjust width for responsiveness
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          {redArr.includes(basicResult) ? (
            <ReportUI
              basicResult={basicResult}
              scoreObj={score}
              sentiCheck={"NEG"}
              sentiCheckShow={"Negative"}
              variant={"contained"}
            />
          ) : greenArr.includes(basicResult) ? (
            <ReportUI
              basicResult={basicResult}
              scoreObj={score}
              sentiCheck={"POS"}
              sentiCheckShow={"Positive"}
              variant={"contained"}
            />
          ) : blueArr.includes(basicResult) ? (
            <ReportUI
              basicResult={basicResult}
              scoreObj={score}
              sentiCheck={"NEU"}
              sentiCheckShow={"Neutral"}
              variant={"contained"}
            />
          ) : (
            <ReportUI
              basicResult={basicResult}
              scoreObj={score}
              sentiCheck={""}
              sentiCheckShow={""}
              variant={"outlined"}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            width: "100%",
            maxWidth: { xs: "90%", sm: "75%", md: "600px" }, // Responsive animation container
          }}
        >
          <Lottie animationData={DataPreviewAnimation} />
        </Box>
      )}
    </Box>
  );
}
