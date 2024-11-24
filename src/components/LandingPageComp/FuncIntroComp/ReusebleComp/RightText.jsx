import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import TextPara from "./TextPara";
import { Box, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function RightText({ heading, Items }) {
  const items = [...Items];

  return (
    <Box
      sx={{
        pt: { xs: "15%", md: "19%" },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Main Heading */}
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "35px", md: "40px" },
          fontWeight: 650,
          textAlign: "center",
          mb: 4,
        }}
      >
        {heading}
      </Typography>

      {/* Carousel Section */}
      <Box
        sx={{
          px: { xs: "8%", md: "10%" },
        }}
      >
        <Carousel
          data-bs-theme="dark"
          indicators
          slide
          touch
          className="func-text-carousel-self"
          style={{
            paddingTop: "2rem",
            height: "21rem",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          {items.map((item) => (
            <Carousel.Item key={item.key}>
              {/* Sub Heading */}
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(41, 51, 194, 0.829)",
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  mb: 2,
                }}
              >
                <i>{item.subHeading}</i>
              </Typography>

              {/* Paragraph */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "18px", md: "20px" },
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  mb: 3,
                }}
              >
                {item.detail}
                <span>
                  <TextPara Items={item.material} />
                </span>
              </Typography>

              {/* Button Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pb: 1,
                }}
              >
                <Button
                  className="func-text-button-self"
                  style={{
                    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                    backgroundColor: "rgba(41, 51, 194, 0.829)",
                    color: "rgba(252, 252, 252, 0.904)",
                    width: "8rem",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                >
                  {item.button}
                </Button>
              </Box>
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
