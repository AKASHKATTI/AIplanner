import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Link as LinkIcon, ListCheck } from 'lucide-react';

const DayCard = ({ dayData }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize state from props, but keep in mind "Source of Truth" issues
  const [isCompleted, setIsCompleted] = useState(dayData.isCompleted);

  // Optional: Update local state if the parent prop changes
  useEffect(() => {
    setIsCompleted(dayData.isCompleted);
  }, [dayData.isCompleted]);

  const toggleComplete = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
   
  };

  return (
    <div className="border rounded-xl mb-4 shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
      
      {/* HEADER */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className={`p-5 flex justify-between items-center cursor-pointer select-none ${
          isCompleted ? "bg-green-50 border-l-4 border-l-green-500" : "bg-white border-l-4 border-l-blue-500"
        }`}
      >
        <div className="flex items-center gap-4">
            
            <div>
                <h3 className="font-bold text-lg text-gray-800">Day {dayData.day}</h3>
                {!isOpen && (
                  <p className="text-xs text-gray-500">
                    {dayData.topics.slice(0, 2).join(", ")}
                    {dayData.topics.length > 2 && "..."}
                  </p>
                )}
            </div>
        </div>
        
       
        <span className="text-gray-400">
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
      </div>

      
      {isOpen && (
        <div className="p-6 border-t bg-gray-50">
          
         
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
                
                <h4 className="text-sm font-bold uppercase tracking-wider">Topics to Cover</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {dayData.topics.map((topic, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border rounded-full text-sm text-gray-700 shadow-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
                <LinkIcon size={18} />
                <h4 className="text-sm font-bold uppercase tracking-wider">Resources</h4>
            </div>
            <ul className="space-y-2">
              {dayData.resources.map((res, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">↗</span>
                  <a href="#" className="text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="mb-6">
            <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-2"><ListCheck size={18} /> Action Items</h4>
            <ul className="space-y-3">
              {dayData.tasks.map((task, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-800 bg-white p-3 rounded border border-gray-100 items-start">
                  <input type="checkbox" className="mt-1 accent-blue-600 h-4 w-4" />
                  <span className="leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          
          {dayData.refNotes && (
            <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-100 flex gap-3 items-start">
                <Lightbulb className="flex-shrink-0 mt-0.5" size={20} />
                <p className="italic">{dayData.refNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DayCard;