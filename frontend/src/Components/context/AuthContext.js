//This code snippet defines an AuthContext and its provider component (AuthContextProvider) using React's context API.
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState([]);

  // Backend base URL
  const BASE_URL = 
    process.env.NODE_ENV === "production"
    ? "https://food-donation-website-fv3s.onrender.com"
    : "http://localhost:3177";

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get(`${BASE_URL}/auth/loggedIn`, {
        withCredentials: true, // allow cookies for authentication
      });

      setLoggedIn(loggedInRes.data.auth);
      setUser(loggedInRes.data.user);
    } catch (error) {
      console.error("Error fetching login status:", error);
      setLoggedIn(false);
      setUser(null);
    }
  }

  // Run once when component mounts
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
