import React, { useState } from "react";
import axios from "axios";

function PlanInput({ setPlans }) {
  const [role, setRole] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic front-end validation
    if (!role.trim() || !noOfDays || !level) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    try {
      const payload = {
        role: role.trim(),
        noOfDays: Number(noOfDays),
        level,
      };

      const response = await axios.post(
        "http://localhost:4000/api/planner/create-plan",
        payload,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      // backend might return a single plan (plan) or array (plans) — handle both
      const returned = response.data;
      let newPlans = [];

      if (Array.isArray(returned.plans)) {
        newPlans = returned.plans;
      } else if (returned.plan) {
        newPlans = [returned.plan];
      } else if (returned.plans && typeof returned.plans === "object") {
        // single object in `plans`
        newPlans = [returned.plans];
      } else if (returned) {
        // fallback: assume response.data is a plan object
        if (typeof returned === "object" && (returned.role || returned.noOfDays)) {
          newPlans = [returned];
        }
      }

      if (newPlans.length === 0) {
        // if API didn't return plan(s), at least append a client-side representation
        const clientPlan = {
          role: payload.role,
          noOfDays: payload.noOfDays,
          level: payload.level,
          createdAt: new Date().toISOString(),
        };
        setPlans((prev) => [clientPlan, ...prev]);
      } else {
        // append new plans to existing (most recent first)
        setPlans((prev) => [...newPlans, ...prev]);
      }

      // success UX
      alert("Plan creation successful!");
      // reset form
      setRole("");
      setNoOfDays("");
      setLevel("");
    } catch (error) {
      console.error("Plan creation failed:", error.response?.data || error.message);
      // better error feedback
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create plan. Check console for details.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Study Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Full Stack Developer"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
          <input
            type="number"
            min="1"
            max="365"
            value={noOfDays}
            onChange={(e) => setNoOfDays(e.target.value)}
            placeholder="7"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Choose level...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>
    </div>
  );
}

export default PlanInput;
