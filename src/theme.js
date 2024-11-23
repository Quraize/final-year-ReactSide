// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Default MUI blue, adjust as needed
    },
    secondary: {
      main: "#dc004e", // Default MUI pink, adjust as needed
    },
    background: {
      default: "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
          color: "#333", // Text color to contrast with the light background
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
  },
});

export default theme;
