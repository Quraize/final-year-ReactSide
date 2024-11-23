// src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL from environment variables
const SIGN_UP_URL = "http://localhost:8000/user/signin";

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(SIGN_UP_URL, { email, password });
    const { token } = response.data;
    // Store the token in localStorage for persistent login
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  localStorage.removeItem('token'); // Clear token from localStorage on sign-out
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;