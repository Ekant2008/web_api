import { useState } from 'react'
import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import LoginForm from './component/Login/Login';
import UsersList from './component/user/user';
import EditUser from './component/user/EditUser';
function App() {
  
  return (
    <>
    
     <Router>
      {/* Define Routes for your application */}
      <Routes>
        {/* The route for the login page */}
        <Route path="/" element={<LoginForm />} />
        
        {/* The route for the users list page */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
   
    </>
  )
}

export default App
