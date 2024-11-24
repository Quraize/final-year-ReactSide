import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderAnimation from "../../../../assets/imageloader.json";
import EmptyAnimation from "../../../../assets/translation.json";
import AOS from "aos";
import "aos/dist/aos.css";

function ReportComp({ Input }) {
  const [summary, setSummary] = useState(""); // Holds the final summary
  const [loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input) {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/evaluation/summarize",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(Input),
            }
          );

          const reportData = await response.json();
          setLoading(false);

          if (!response.ok || !reportData.summary) {
            toast.error(reportData.message || "Failed to fetch report data.");
            return;
          }

          // Store the summary directly
          setSummary(reportData.summary);
        } catch (error) {
          setLoading(false);
          toast.error(
            error.message || "An error occurred while generating the report."
          );
        }
      }
    },
    [Input]
  );

  useEffect(() => {
    handleReport();
  }, [handleReport, Input]);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out-back",
    });
  }, []);

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
        <Lottie
          animationData={LoaderAnimation}
          style={{ height: "200px", width: "200px" }}
        />
      ) : summary ? (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: "800px",
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            animation: "fade-in 1.5s",
          }}
          data-aos="fade-bottom"
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Generated Summary:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap", // Preserve line breaks
              color: "#555",
              fontSize: "1rem",
            }}
          >
            {summary}
          </Typography>
        </Paper>
      ) : (
        <Lottie
          animationData={EmptyAnimation}
          style={{
            height: "300px",
            width: "300px",
          }}
        />
      )}
      <ToastContainer />
    </Box>
  );
}

export default ReportComp;
