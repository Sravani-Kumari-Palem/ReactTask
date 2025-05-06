// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/home';
import Event from './Components/event';
import Marketing from './Components/marketing';
import Venue from './Components/venue';
import Orders from './Components/orders';
import CreateVenue from './Components/CreateVenue';

const App = () => {
  const isAuthenticated = localStorage.getItem('currentUser') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard/venue" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="events" element={<Event />} />
          <Route path="orders" element={<Orders />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="venue" element={<Venue />} />
          <Route path="venue/create" element={<CreateVenue />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
