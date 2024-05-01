import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types'; // Import prop-types

function AuthGuard({ children }) {
  const isLoggedIn = Cookies.get('user') === 'true'; // Convert to boolean
  if (!Cookies.get('user')) {
    return <Navigate to="/login" />;
  }

  if (isLoggedIn) {
    // If admin is required and the user is not an admin, redirect to home
    return <Navigate to="/games" />;
  }
  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired // PropTypes validation for children
};

export default AuthGuard;
