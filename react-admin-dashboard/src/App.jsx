import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Import LoginPage
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MOBILE_BREAKPOINT = 768;

function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const navigate = useNavigate(); // For redirection

  const updateView = useCallback(() => {
    const newIsMobileView = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobileView !== newIsMobileView) {
      setIsMobileView(newIsMobileView);
      // Adjust sidebar states when switching between mobile/desktop
      if (newIsMobileView) { // Switched to Mobile
        setIsMobileSidebarOpen(false); // Close mobile sidebar
        // Desktop state doesn't matter as much on mobile, but can reset
        // setIsDesktopSidebarCollapsed(false); // Or keep its last state
      } else { // Switched to Desktop
        // setIsDesktopSidebarCollapsed retains its state or reset as needed
        // Mobile sidebar should be closed
        setIsMobileSidebarOpen(false);
      }
    }
  }, [isMobileView]);

  useEffect(() => {
    window.addEventListener('resize', updateView);
    updateView(); // Initial check
    return () => window.removeEventListener('resize', updateView);
  }, [updateView]);

  const toggleMobileSidebar = () => {
    if (isMobileView) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const toggleDesktopSidebar = () => {
    if (!isMobileView) {
      setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
    }
  };
  
  // General toggle for header button, decides action based on view
  const handleSidebarToggle = () => {
    if (isMobileView) {
      toggleMobileSidebar();
    } else {
      toggleDesktopSidebar();
    }
  };


  // Determine sidebar visibility/state for props
  const sidebarOpen = isMobileView ? isMobileSidebarOpen : !isDesktopSidebarCollapsed;
  // For Sidebar component, it needs to know if it's in mobile view for its internal logic (e.g. close button)
  // and its current open/collapsed state
  const sidebarCollapsed = isMobileView ? !isMobileSidebarOpen : isDesktopSidebarCollapsed;

  // Authentication Handlers
  const handleLogin = async (email, password) => {
    console.log("Attempting login with:", email, password);
    if (email && password) {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect after successful login
      console.log("Mock login successful, navigating to dashboard");
    } else {
      console.log("Mock login failed: fields cannot be empty");
      // setError('Login failed. Please check your credentials.'); // Example for displaying error
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
    console.log("User logged out, navigating to login");
  };

  // Define layout for authenticated users
  const AuthenticatedLayout = () => (
    <div className={`app-layout ${isMobileView && isMobileSidebarOpen ? 'sidebar-overlay-active' : ''}`}>
      <Sidebar 
        isMobileView={isMobileView}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        toggleSidebar={handleSidebarToggle}
        closeMobileSidebar={toggleMobileSidebar}
      />
      {isMobileView && isMobileSidebarOpen && <div className="sidebar-overlay active" onClick={toggleMobileSidebar}></div>}
      <div 
        className={`content-wrapper ${
          !isMobileView && isDesktopSidebarCollapsed ? 'sidebar-closed' : 
          !isMobileView && !isDesktopSidebarCollapsed ? 'sidebar-open' : ''
        }`}
      >
        <Header toggleSidebar={handleSidebarToggle} onLogout={handleLogout} /> {/* Pass onLogout here */}
        <MainContent 
          isDesktopSidebarCollapsed={isDesktopSidebarCollapsed} 
          isMobileView={isMobileView} 
        /> {/* MainContent contains the Outlet for Dashboard/Profile etc. */}
      </div>
    </div>
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }
      >
        {/* Children of this route are rendered by MainContent's Outlet within AuthenticatedLayout */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* Catch-all for any other authenticated routes, redirects to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
