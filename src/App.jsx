import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';

import { AuthProvider, useAuth }   from './contexts/AuthContext';
import ProtectedRoute              from './components/ProtectedRoute';
import Layout                      from './components/Layout';

import Login    from './pages/auth/Login';
import Register from './pages/auth/Register';

import PatientDashboard from './pages/patient/PatientDashboard';
import { BookAppointment, TestResults, Prescriptions, PatientEmergency } from './pages/patient/PatientPages';

import { StaffDashboard, StaffSchedule, AssignedPatients, ClinicalNotes, StaffAlertsPage } from './pages/staff/StaffPages';

import { AdminDashboard, AdminBeds, AdminEquipment, AdminStaff, AdminEmergency } from './pages/admin/AdminPages';

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin')   return <Navigate to="/admin/dashboard"   replace />;
  if (user.role === 'staff')   return <Navigate to="/staff/dashboard"   replace />;
  return <Navigate to="/patient/dashboard" replace />;
}

function P({ element, roles }) {
  return (
    <ProtectedRoute allowedRoles={roles}>
      <Layout>{element}</Layout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/"         element={<RootRedirect />} />

      <Route path="/patient/dashboard"    element={<P element={<PatientDashboard />} roles={['patient']} />} />
      <Route path="/patient/appointments" element={<P element={<BookAppointment />}  roles={['patient']} />} />
      <Route path="/patient/results"      element={<P element={<TestResults />}      roles={['patient']} />} />
      <Route path="/patient/prescriptions"element={<P element={<Prescriptions />}   roles={['patient']} />} />
      <Route path="/patient/emergency"    element={<P element={<PatientEmergency />}roles={['patient']} />} />

      <Route path="/staff/dashboard" element={<P element={<StaffDashboard />}  roles={['staff']} />} />
      <Route path="/staff/schedule"  element={<P element={<StaffSchedule />}   roles={['staff']} />} />
      <Route path="/staff/patients"  element={<P element={<AssignedPatients />}roles={['staff']} />} />
      <Route path="/staff/notes"     element={<P element={<ClinicalNotes />}   roles={['staff']} />} />
      <Route path="/staff/alerts"    element={<P element={<StaffAlertsPage />} roles={['staff']} />} />

      <Route path="/admin/dashboard" element={<P element={<AdminDashboard />} roles={['admin']} />} />
      <Route path="/admin/beds"      element={<P element={<AdminBeds />}      roles={['admin']} />} />
      <Route path="/admin/equipment" element={<P element={<AdminEquipment />} roles={['admin']} />} />
      <Route path="/admin/staff"     element={<P element={<AdminStaff />}     roles={['admin']} />} />
      <Route path="/admin/emergency" element={<P element={<AdminEmergency />} roles={['admin']} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
