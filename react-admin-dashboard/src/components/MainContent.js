import React from 'react';
import { Outlet } from 'react-router-dom';
// Removed imports for components like Container, Row, Col, Card, etc., as they are now in Dashboard.js
// Bootstrap icons CSS is also removed as it's specific to content, now in Dashboard.js

const MainContent = (props) => {
  const { isDesktopSidebarCollapsed, isMobileView } = props;

  // Dynamic style for main content area based on sidebar state and view
  // This style primarily handles positioning relative to the sidebar and basic background/padding.
  const mainContentStyle = {
    paddingTop: '20px', // Initial padding from top
    paddingBottom: '20px', // Padding at the bottom
    paddingLeft: '20px', // Padding on the sides
    paddingRight: '20px', // Padding on the sides
    backgroundColor: '#f8f9fa', // A light background for the content area
    flexGrow: 1, // Ensure it takes up available space
    // marginLeft is handled by the parent .content-wrapper's CSS rules in App.css
    minHeight: 'calc(100vh - 70px)', // Assuming header is roughly 70px. Adjust as needed.
    overflowY: 'auto', // Allow content to scroll
  };

  return (
    // The className "main-content-area" can be used for App.css styling if needed
    // This main tag itself is the container that provides padding and background for the routed content.
    <main className="main-content-area" style={mainContentStyle}>
      <Outlet /> {/* This will render the matched child route (e.g., Dashboard) */}
    </main>
  );
};

export default MainContent;
