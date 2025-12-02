import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, BrowserRouter, Routes, Route } from "react-router-dom"; 


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,

        { username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      // console.log("Server Response:", response);

      const data = response.data;

      
      if (data.success || data.token) {
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Signup successful! You are now logged in.");
            navigate("/"); 
        } else {
            alert("Signup successful! Please login.");
            navigate("/login"); 
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      
      // FIXED: Ensure we extract a STRING error message, not an object
      let serverMessage = "Network error — try again later.";
      if (err.response && err.response.data) {
        // If data is a string, use it
        if (typeof err.response.data === 'string') {
            serverMessage = err.response.data;
        } 
        // If data is an object with a message property
        else if (err.response.data.message) {
            serverMessage = err.response.data.message;
        }
        // Fallback for other object structures
        else {
            serverMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        serverMessage = err.message;
      }
      
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up here</h2>

        <form onSubmit={handleSignup}>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black-100"
            required
          />

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="akash@example.com"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black-100"
            required
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black-200"
            required
          />

          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black-200"
            required
          />

          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;