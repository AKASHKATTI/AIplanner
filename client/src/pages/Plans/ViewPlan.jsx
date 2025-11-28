import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DayCard from "../../components/Cards/Daycard";// Adjust path as needed

const ViewPlan = () => {
  const { id } = useParams(); // 1. Get the ID from the URL
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // 2. Dynamic API call using the ID
        const response = await axios.get(`http://localhost:4000/api/planner/plans/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlan(response.data);
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Could not load plan details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlanDetails();
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading plan...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!plan) return <div className="p-10 text-center">Plan not found.</div>;
  // track the process
  

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{plan.role} Path</h1>
          <p className="text-gray-500 mt-1">
            Level: {plan.level} • Duration: {plan.noOfDays} Days
          </p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Days List */}
      <div className="space-y-4">
        {/* 3. Check if daywisePlan exists before mapping */}
        {plan.daywisePlan && plan.daywisePlan.length > 0 ? (
          plan.daywisePlan.map((day) => (
            <DayCard key={day._id} dayData={day} />
          ))
        ) : (
          <div className="text-gray-500 italic">No daily schedule available for this plan yet.</div>
        )}
      </div>
    </div>
  );
};

export default ViewPlan;