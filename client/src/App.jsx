import React from "react"; // Removed unused useState
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/AUTH/Login";
import Register from "./pages/AUTH/Register";
import UserProvider from "./Context/UserContext"; // Ensure this path is correct based on your file structure
import Dashboard from "./pages/Plans/Dashboard";
import ViewPlan from "./pages/Plans/ViewPlan";
import PlanInput from "./pages/Plans/PlanInput";
import Navbar from "./components/Navbar";

function App() {
  // Removed unused 'plans' state. 
  // Ideally, 'plans' should be managed inside Dashboard or a PlansContext.

  return (
    // 1. Wrap the whole app in UserProvider so Navbar can access user state
    <UserProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />

          {/* 2. Simplified Routes (Provider is now global) */}
          <Route path='/plans' element={<Dashboard />} />
          <Route path='/plans/:id' element={<ViewPlan />} />
          <Route path='/plans/create-plan' element={<PlanInput />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;