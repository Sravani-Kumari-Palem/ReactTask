import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './dashboard.css';
import Home from './home';
import Event from './event';
import Marketing from './marketing';
import Venue from './venue';
import Orders from './orders';
//import { FaUser, FaSearch, FaRegHeart } from 'react-icons/fa';

const Dashboard = ({ onLogout }) => {
  //const [venues, setVenues] = useState([]);
  const currentUser = localStorage.getItem('currentUser') 
    ? JSON.parse(localStorage.getItem('currentUser')).email.split('@')[0]
    : 'Guest';

  const location = useLocation();

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="logo-square" />
          <span>CubeQ Anlytica</span>
        </div>
        <nav className="dashboard-nav">
          <Link to="/dashboard/home" className={`nav-link${location.pathname === '/dashboard/home' ? ' active' : ''}`}>Home</Link>
          <Link to="/dashboard/events" className={`nav-link${location.pathname === '/dashboard/events' ? ' active' : ''}`}>Events</Link>
          <Link to="/dashboard/orders" className={`nav-link${location.pathname === '/dashboard/orders' ? ' active' : ''}`}>Orders</Link>
          <Link to="/dashboard/marketing" className={`nav-link${location.pathname === '/dashboard/marketing' ? ' active' : ''}`}>Marketing</Link>
          <Link to="/dashboard/venue" className={`nav-link${location.pathname === '/dashboard/venue' ? ' selected' : ''}`}>Venue</Link>
          <Link to="/" className="nav-link" onClick={() => { localStorage.removeItem('currentUser'); if (onLogout) onLogout(); }}>Logout</Link>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-user">
            <span className="user-icon"><i className="far fa-user"></i></span>
            <span className="user-name">{currentUser}</span>
          </div>
        </header>
        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 