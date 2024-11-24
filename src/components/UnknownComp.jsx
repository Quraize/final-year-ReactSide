import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import NotFoundAnimation from "../assets/unknown.json"; // Replace with a relevant Lottie animation

function UnknownComp() {
    const navigate = useNavigate();

    const handleGoHome = () => {
      navigate("/"); // Redirect to the home page
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          background:
            "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
          px: 4,
        }}
      >
        {/* Left Section: Animation */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: 4, md: 0 },
          }}
        >
          <Lottie
            animationData={NotFoundAnimation}
          />
        </Box>
  
        {/* Right Section: Text and Button */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "28px", md: "36px" },
              fontWeight: "bold",
              color: "#333",
              mb: 2,
            }}
          >
            Oops! Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              color: "#555",
              mb: 4,
            }}
          >
            The page you're looking for doesn't exist. It might have been removed or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    );
}

export default UnknownComp