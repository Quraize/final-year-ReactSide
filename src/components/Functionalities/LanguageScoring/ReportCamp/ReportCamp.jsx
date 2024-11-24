import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, CircularProgress, Chip, Paper } from "@mui/material";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderAnimation from "../../../../assets/imageloader.json";
import EmptyAnimation from "../../../../assets/sentiinput.json";

function ReportCamp({ Input }) {
  const [basicResult, setBasicResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReport = useMemo(
    () => async () => {
      if (Input) {
        try {
          setLoading(true);

          const response = await fetch(
            "http://localhost:8000/evaluation/keywords",
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

          if (!response.ok || !reportData.keywords) {
            toast.error("Failed to fetch report data.");
            return;
          }

          // Split keywords string into an array and store in basicResult
          setBasicResult(reportData.keywords.split(", "));
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
      {loading ? (
        <Lottie
          animationData={LoaderAnimation}
          style={{ height: "200px", width: "200px" }}
        />
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
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#555", mb: 2 }}
            >
              Result:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {basicResult.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    backgroundColor: "#e3f2fd", // Light blue background
                    borderColor: "#64b5f6", // Blue outline
                    color: "#1976d2", // Blue text color
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      ) : (
        <Lottie
          animationData={EmptyAnimation}
        />
      )}
    </Box>
  );
}

export default ReportCamp;
