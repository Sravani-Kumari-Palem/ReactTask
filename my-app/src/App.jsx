// src/App.jsx
import React, { useState } from 'react';
import Signup from './Components/Signup';
import Login from './Components/login';
import Dashboard from './Components/Dashboard';
import CreateVenue from './Components/CreateVenue';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateVenue, setShowCreateVenue] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  if (isLoggedIn) {
    if (showCreateVenue) {
      return <CreateVenue onVenueCreated={() => setShowCreateVenue(false)} />;
    }
    return <Dashboard onCreateVenue={() => setShowCreateVenue(true)} onLogout={handleLogout} />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {showLogin ? (
        <Login
          onLoginSuccess={() => setIsLoggedIn(true)}
          onSwitchToSignup={() => setShowLogin(false)}
        />
      ) : (
        <Signup onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default App;
