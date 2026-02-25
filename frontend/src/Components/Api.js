import axios from "axios";

// Use environment variable if available, otherwise default to localhost for development
const baseURL = 
  process.env.REACT_APP_API_URL || 
  "http://localhost:3177";

export default axios.create({ 
  baseURL: baseURL,
  withCredentials: true 
});
