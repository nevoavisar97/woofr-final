// Import the necessary function from Redux Toolkit to configure the store
import { configureStore } from "@reduxjs/toolkit";

// Import the reducer for the authentication slice
import authReducer from "./authSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
