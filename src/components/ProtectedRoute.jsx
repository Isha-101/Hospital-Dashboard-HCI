import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin')   return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'staff')   return <Navigate to="/staff/dashboard" replace />;
    return <Navigate to="/patient/dashboard" replace />;
  }
  return children;
}
