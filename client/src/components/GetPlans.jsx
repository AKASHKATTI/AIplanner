import React from "react";
import { useNavigate } from "react-router-dom";

function GetPlans({ plans }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {plans.map((plan) => {
        const id = plan._id || plan.id; // use the backend ID

        return (
          <div
            key={id}
            onClick={() => navigate(`/plan/${id}`)}
            className="p-4 bg-white rounded-xl shadow cursor-pointer hover:shadow-lg"
          >
            <p><strong>Role:</strong> {plan.role}</p>
            <p><strong>Days:</strong> {plan.noOfDays}</p>
            <p><strong>Level:</strong> {plan.level}</p>
          </div>
        );
      })}
    </div>
  );
}

export default GetPlans;