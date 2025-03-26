import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register user
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    handleError(error, "registration");
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    handleError(error, "login");
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    handleError(error, "logout");
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    handleError(error, "forgot password request");
  }
};

// Verify OTP
export const verifyOTP = async (data) => {
  try {
    const response = await api.post("/verify-otp", data);
    return response.data;
  } catch (error) {
    handleError(error, "OTP verification");
  }
};

// Fetch user data
export const fetchUser = async () => {
  const token = localStorage.getItem("token"); // Get the token from local storage
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // This should return the user data
  } catch (error) {
    handleError(error, "fetching user data");
  }
};

// Run code
export const runCode = async (code) => {
  try {
    const response = await api.post("/practice/run-code/", { code });
    return response.data; // Return the output from the API
  } catch (error) {
    handleError(error, "running code");
  }
};

// Generic error handling function
const handleError = (error, action) => {
  if (error.response) {
    throw new Error(
      error.response.data.message || `An error occurred during ${action}`
    );
  } else {
    throw new Error(`Network error during ${action}`);
  }
};
