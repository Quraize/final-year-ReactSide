import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/signUpSlice';
import authReducer from './slices/SignInSlice'

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice
    auth: authReducer
  },
});

export default store;