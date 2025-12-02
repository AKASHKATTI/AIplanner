import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlanInput = () => {
  const Navigate = useNavigate();
  const [role, setRole] = useState("");
  const [noOfDays, setNoOfDays] = useState(7);
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/planner/create-plan`,
        { role, noOfDays, level },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Plan created successfully!");
      Navigate("/plans");
      setRole("");
      setNoOfDays(7);
      setLevel("");


    } catch (error) {
      console.error("Plan creation failed:", error);
      alert("Failed to create plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Study Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., MERN Developer"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={noOfDays}
            onChange={(e) => setNoOfDays(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
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
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Plan"}
        </button>

      </form>
    </div>
  );
};

export default PlanInput;
