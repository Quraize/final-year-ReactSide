import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function ReportUI({ basicResult, scoreObj, sentiCheck, sentiCheckShow, variant }) {
  const capitalize = (str) => str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
  const toPercentage = (num) => (num * 100).toFixed(2) + "%";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Primary Result Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 300, sm: 600 },
          p: { xs: 2, sm: 3 },
          mb: { xs: 3, sm: 4 },
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: "bold",
            color: "#333",
            mb: 1,
          }}
        >
          Primary Result
        </Typography>
        <Button
          variant={variant}
          sx={{
            fontSize: { xs: "0.9rem", sm: "1.2rem" },
            textTransform: "capitalize",
            color: "#fff",
            backgroundColor: basicResult === "negative" ? "#ff4d4d" : "#4caf50",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            borderRadius: 10,
            "&:hover": {
              backgroundColor: basicResult === "negative" ? "#e63939" : "#388e3c",
            },
          }}
        >
          {capitalize(basicResult === sentiCheck ? sentiCheckShow : basicResult)}
        </Button>
      </Box>

      {/* Detailed Analysis Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 300, sm: 600, md: 800 },
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: "bold",
            color: "#333",
            mb: 2,
          }}
        >
          Detailed Analysis
        </Typography>
        {scoreObj && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              boxShadow: "none",
              maxHeight: 200,
              overflowY: "auto",
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#555", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  >
                    Score Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#555", fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  >
                    Percentage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(scoreObj).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell
                      sx={{
                        color: "#333",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        textTransform: "capitalize",
                      }}
                    >
                      {capitalize(key)}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#333",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      }}
                    >
                      {toPercentage(value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
