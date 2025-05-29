import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    // 'replace' avoids adding the current (protected) route to the history stack.
    // So, if the user clicks "back" from the login page, they don't get stuck
    // in a loop if the page they came from was the one that redirected them.
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the child components (the actual protected page/content)
  return children;
};

export default ProtectedRoute;
