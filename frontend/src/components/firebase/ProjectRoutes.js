// Description: Routes for pages

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import components
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute  from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';


export default function ProjectRoutes() {
  return (
    <>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/settings" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}
