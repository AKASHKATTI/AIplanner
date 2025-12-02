import React, { useEffect, useState } from "react";
import PlanCard from "../../components/Cards/PlanCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token"); 
        console.log(token)

        
        
        
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/planner/plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAvailablePlans(response.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []); // <--- [CRITICAL] Empty dependency array prevents infinite loop

  const handleOnClickPlan = (id) => {
    if (!id) return;
    navigate(`/plans/${id}`);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="p-5">
        {/* <h1 className="text-2xl font-bold mb-4">Plans</h1> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePlans.map((plan) => (
            <div 
              key={plan._id} 
              onClick={() => handleOnClickPlan(plan._id)}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <PlanCard
                id={plan._id}
                role={plan.role}
                level={plan.level}
                // Map API 'noOfDays' to the prop 'days'
                days={plan.noOfDays} 
                // Format the date if it exists
                createdAt={plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "N/A"}
              />
            </div>
          ))}
        </div>
      </div>

      <button
  className="fixed  px-10 py-2  bottom-8 left-1/2 -translate-x-1/2 bg-amber-900 p-3 px-6 rounded-3xl text-white font-semibold shadow-lg hover:bg-amber-800 transition-all transform hover:scale-105 z-50"
  onClick={() => navigate("/plans/create-plan")}
>
  Create Plan
</button>
    </div>
  );
}

export default Dashboard;