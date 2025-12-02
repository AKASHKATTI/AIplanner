import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Clock, Calendar } from "lucide-react"; // Add Lucide icons import
import DayCard from "../../components/Cards/Daycard";

const ViewPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/planner/plans/${id}`, {
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

  return (
    <div className="flex h-screen-fixed">
      {/* Main Content - Full height, scrollable */}
      <div className="flex-1 max-w-4xl mx-auto p-8 overflow-y-auto">
        {/* Header Section */}
        <button 
          onClick={() => navigate(-1)} // Fixed: use function call
          className="group flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{plan.role} Path</h1>
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
          <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md text-gray-700">
            <Clock size={14} /> {plan.level}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md text-gray-700">
            <Calendar size={14} /> {plan.noOfDays} Days
          </span>
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {plan.daywisePlan && plan.daywisePlan.length > 0 ? (
            plan.daywisePlan.map((day) => (
              <DayCard key={day._id} dayData={day} />
            ))
          ) : (
            <div className="text-gray-500 italic text-center py-12">No daily schedule available for this plan yet.</div>
          )}
        </div>
      </div>

      {/* Fixed Sidebar Chat */}
      {/* <div className="w-1/2 bg-amber-700 h-screen-fixed relative hidden lg:block">
        <div className="h-[calc(100%-80px)] overflow-y-auto p-4">
          chatbot here
        </div>
        <div className="fixed bottom-0 left-1/2 w-1/2 bg-amber-700/95 backdrop-blur-sm border-t border-amber-600 p-4 pt-3">
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Type your message..."
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
              Send
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewPlan;
