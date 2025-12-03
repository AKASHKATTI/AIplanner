import React from "react"; 
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/AUTH/Login";
import Register from "./pages/AUTH/Register";


import UserProvider from "./components/AUTH/UserProvider"; 


import Dashboard from "./pages/Plans/Dashboard";
import ViewPlan from "./pages/Plans/ViewPlan";
import PlanInput from "./pages/Plans/PlanInput";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          
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