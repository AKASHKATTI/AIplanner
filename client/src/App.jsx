import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/AUTH/Login";
import Register from "./pages/AUTH/Register";
import UserProvider from "./components/AUTH/UserProvider";
import Dashboard from "./pages/Plans/Dashboard";
import ViewPlan from "./pages/Plans/ViewPlan";
import PlanInput from "./pages/Plans/PlanInput";




function App() {
  const [plans, setPlans] = useState([]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />

         <Route path='/plans'
          element={
            <UserProvider>
              <Dashboard />
            </UserProvider>
          } />
          <Route path='/plans/:id'
          element={
            <UserProvider>
              <ViewPlan />
            </UserProvider>
          } />

          <Route path='/plans/create-plan'
          element={
            <UserProvider>
              <PlanInput />
            </UserProvider>
          } />

         <Route path='/login' element = {<Login/>}/>
         <Route path='/register' element = {<Register/>}/>

      </Routes>
    </div>
  );
}

export default App;
