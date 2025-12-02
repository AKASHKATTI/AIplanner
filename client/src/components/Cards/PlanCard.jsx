import React from 'react';
import { Calendar, Clock, BarChart } from 'lucide-react'; // Optional icons

/**
 * PlanCards
 * UI-only card component. Accepts props with sensible defaults.
 *
 * Props:
 *  - role (string)
 *  - days (number)
 *  - level (string) -> Beginner | Intermediate | Advanced
 *  - createdAt (string) -> formatted date
 */
function PlanCard({
  role = "Full Stack Developer",
  days = 30,
  level = "Beginner",
  createdAt = new Date().toLocaleDateString(),
}) {
  
  const getInitials = (name) => {
    if (!name) return "P";
    return name
      .split(/\s+/) 
      .map((word) => word[0] || "")
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 3); 
  };

  
  const getLevelColor = (lvl) => {
    if (!lvl) return 'bg-gray-100 text-gray-700 border-gray-200';
    const l = lvl.toLowerCase();
    if (l === 'beginner') return 'bg-green-100 text-green-700 border-green-200';
    if (l === 'intermediate') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200'; 
  };

  return (
    <div className="group relative block w-full max-w-md p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        {/* Initials Circle */}
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-lg shadow-sm">
          {getInitials(role)}
        </div>

        {/* Title */}
        <div className="min-w-0">
          <h5 className="text-xl font-bold text-teal-900 leading-tight group-hover:text-teal-600 transition-colors truncate">
            {role}
          </h5>
          <span className="text-xs text-gray-400 font-medium">Study Plan</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 w-full mb-4" />

      {/* Details */}
      <div className="space-y-3">
        {/* Duration */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={16} />
            <span>Duration</span>
          </div>
          <span className="font-semibold text-gray-900">{days} Days</span>
        </div>

        {/* Level */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <BarChart size={16} />
            <span>Difficulty</span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(level)}`}
          >
            {level}
          </span>
        </div>

        {/* Created At */}
        <div className="flex items-center justify-between text-sm pt-2">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Calendar size={14} />
            <span>Created: {createdAt}</span>
          </div>
        </div>
      </div>

      {/* Decorative hover dot */}
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-teal-500 rounded-full" />
      </div>
    </div>
  );
}

export default PlanCard;
