// DayWiseData.jsx
import React from "react";
import { useParams } from "react-router-dom";

function DayWiseData() {
  const { id } = useParams();  // this gets the /plan/:id value

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold">Plan Details</h1>
      <p className="text-gray-600 mt-2">Showing details for Plan ID:</p>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <code className="text-blue-700">{id}</code>
      </div>
    </div>
  );
}

export default DayWiseData;
