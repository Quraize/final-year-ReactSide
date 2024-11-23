import React, { useState } from "react";
import { Box, TextField, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "../store/slices/SignInSlice";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.auth);
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!email || !password) {
          toast.error("Both email and password are required!");
          return;
        }
    
        dispatch(signIn({ email, password }))
          .unwrap()
          .then((response) => {
            navigate("/"); // Redirect to the home page
          })
          .catch((err) => {
            toast.error(err.message || "Sign-In failed!");
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
            Sign In to Voxalyze
          </Typography>
  
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
  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
  
          {/* "Don't have an account? Create an account" link */}
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>
    );
}

export default SignInPage