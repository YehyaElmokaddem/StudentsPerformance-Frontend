import axios from "axios";

const apiUrl = process.env.VUE_APP_API_BASE_URL;

const API = axios.create({
  baseURL: apiUrl,
  // baseURL: "http://localhost:3000/api/v1",
  // baseURL: "http://192.168.8.109:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle response
const onResponse = (response) => {
  return response;
};

// Handle error
const onError = (error) => {
  console.error("API call failed:", error);
  return Promise.reject(error.response || error.message);
};

// Attach handlers to the API
API.interceptors.response.use(onResponse, onError);

export default API;
