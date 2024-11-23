import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the sign-up API endpoint
const SIGN_UP_URL = "http://localhost:8000/user/signup";

// Async thunk for handling the sign-up API call
export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(SIGN_UP_URL, userData);
      return response.data; // Return the API response
    } catch (error) {
      // Return the error message from the API
      return rejectWithValue(error.response?.data || "Sign-up failed");
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for sign-up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle fulfilled state for sign-up
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // Handle rejected state for sign-up
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;
