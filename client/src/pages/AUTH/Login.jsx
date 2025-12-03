import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const payload = { email, password };

    try {
      setLoading(true);


      
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, payload, {

        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
        
      });

      
      const data = response.data;
      console.log("Login successful:", data);

      
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect after login
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);

      
      const serverMessage = err?.response?.data?.message || err?.response?.data || err.message;
      setError(serverMessage || "An error occurred during login.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome back — please login</h2>

        <form onSubmit={handleLogin}>
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

          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
