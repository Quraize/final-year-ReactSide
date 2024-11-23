import React, { useState } from "react";
import { Box, TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/slices/signUpSlice";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { isLoading } = useSelector((state) => state.user);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Frontend validation
      if (!username) {
        toast.error("Username is required!");
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }
      if (!password || password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
  
      // Dispatch sign-up action
      dispatch(signUp({ username, email, password }))
        .unwrap()
        .then((response) => {
          toast.success(response.message || "Sign-Up successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
  
          // Redirect to the home page
          navigate("/signin"); // Redirect to "/"
        })
        .catch((error) => {
          toast.error(error.message || "Sign-Up failed!");
        });
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(117deg, rgba(109,106,106,1) 0%, rgba(168,164,164,1) 0%, rgba(172,166,166,1) 8%, rgba(205,197,197,1) 89%, rgba(244,234,234,1) 100%)",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "700px",
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "black", mb: 3, fontWeight: "bold" }}
          >
            Sign Up to Voxalyze
          </Typography>
  
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
  
          {/* "Already have an account? Sign In" link */}
          <Typography sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    );
}

export default SignUpPage;
