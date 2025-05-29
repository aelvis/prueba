import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Dashboard from './pages/Dashboard'; // Import Dashboard page
import Profile from './pages/Profile'; // Import Profile page
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const MOBILE_BREAKPOINT = 768;

function App() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

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


  return (
    <div className={`app-layout ${isMobileView && isMobileSidebarOpen ? 'sidebar-overlay-active' : ''}`}>
      <Sidebar 
        isMobileView={isMobileView}
        isOpen={sidebarOpen} // General open state for the sidebar's display logic
        isCollapsed={sidebarCollapsed} // More specific for desktop styling
        toggleSidebar={handleSidebarToggle} // Pass the general toggle
        closeMobileSidebar={toggleMobileSidebar} // Specific for mobile close button
      />
      {isMobileView && isMobileSidebarOpen && <div className="sidebar-overlay active" onClick={toggleMobileSidebar}></div>}
      <div 
        className={`content-wrapper ${
          !isMobileView && isDesktopSidebarCollapsed ? 'sidebar-closed' : 
          !isMobileView && !isDesktopSidebarCollapsed ? 'sidebar-open' : ''
        }`}
      >
        <Header toggleSidebar={handleSidebarToggle} />
        {/* MainContent is now a layout route that contains the Outlet */}
        <Routes>
          <Route 
            element={
              <MainContent 
                isDesktopSidebarCollapsed={isDesktopSidebarCollapsed} 
                isMobileView={isMobileView} 
              />
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            {/* Example for a "Not Found" page if you add one: 
            <Route path="*" element={<div>Page Not Found</div>} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
