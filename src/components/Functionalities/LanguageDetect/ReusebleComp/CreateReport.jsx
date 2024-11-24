import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Chip, Paper, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderAnimation from "../../../../assets/imageloader.json";
import EmptyAnimation from "../../../../assets/sentiinput.json";

function CreateReport({ Input = [] }) {
  const [basicResult, setBasicResult] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input && Array.isArray(Input.texts)) {
        try {
          setLoading(true);

          const response = await fetch(
            "http://localhost:8000/analysis/language-detect",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ texts: Input.texts }),
            }
          );

          const reportData = await response.json();
          setLoading(false);

          // Process results
          setBasicResult(reportData.result);
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
      {Loading ? (
        <Lottie animationData={LoaderAnimation}/>
      ) : basicResult.length > 0 ? (
        <Box
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: "800px",
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {basicResult.map((result, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Predicted Language */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#555", flexShrink: 0 }}
                >
                  Predicted Language:
                </Typography>
                <Chip
                  label={result.predicted_language}
                  color="success"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                />
              </Box>

              {/* Relative Score */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#555", flexShrink: 0 }}
                >
                  Relative Score:
                </Typography>
                <Chip
                  label={`${(result.score * 100).toFixed(2)}%`}
                  color="primary"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                />
              </Box>

              {/* Provided Text */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#555", mb: 1 }}
                >
                  Provided Text:
                </Typography>
                <Typography variant="body1" sx={{ color: "#333" }}>
                  {result.text}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Lottie
          animationData={EmptyAnimation}
        />
      )}
    </Box>
  );
}

export default CreateReport;
