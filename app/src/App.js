import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Componants/Loginpage'; // Ensure the path is correct, it's typically case-sensitive
import Home from './Componants/Home'; // Ensure the path is correct, it's typically case-sensitive

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* If you have other routes, they should also be defined within this <Routes> component */}
      </Routes>
    </Router>
  );
}

export default App;
