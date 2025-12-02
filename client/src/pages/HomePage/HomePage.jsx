import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
 
  const navigate = useNavigate();

  return (
    <div className="px-2 py-6">

      

      <div className="flex flex-col lg:flex-row justify-between ml-20">
        
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-5 mt-20">

          <div className="relative inline-flex gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-800 text-sm font-semibold shadow-sm">
            <Sparkles size={16} />
            <span>AI Powered Study Planner</span>
          </div>

          <div className="">
            <h1 className="text-6xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight text-left">
              Plan, Start, Learn{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Level Up.
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed text-left mt-5">
              Stop guessing what to study next. Let our AI build your perfect roadmap  
              so you can focus on learning, not planning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-1 mt-5">
            {/* 3. Fix the onClick handler */}
            <button 
              className="group relative px-5 py-2 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
              onClick={() => navigate("/plans")}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>


      </div>

      {/* BOTTOM IMAGE SECTION */}
      <div className="bg-black mt-10 h-72 flex items-center justify-center ml-20 mr-20">
        <img
          src="#" // Don't forget to add an image URL here later!
          alt="Banner"
          className="w-full h-auto rounded-lg"
        />
      </div>
      
    </div>
  );
}

export default HomePage;