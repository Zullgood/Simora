import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Clear old authentication data if exists
  if (localStorage.getItem('isAuthenticated')) {
    localStorage.removeItem('isAuthenticated');
  }
  
  if (!token || token === 'null' || token === 'undefined') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;