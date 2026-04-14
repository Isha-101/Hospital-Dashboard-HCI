import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from './Icons';

const TITLES = {
  '/admin/dashboard': 'Command Centre',
  '/admin/beds':      'Bed Management',
  '/admin/equipment': 'Equipment Tracking',
  '/admin/staff':     'Staff Directory',
  '/admin/emergency': 'Emergency / ER Monitor',
  '/staff/dashboard': 'My Dashboard',
  '/staff/schedule':  'My Schedule',
  '/staff/patients':  'Assigned Patients',
  '/staff/notes':     'Clinical Notes',
  '/staff/alerts':    'Alerts',
  '/patient/dashboard':     'Patient Dashboard',
  '/patient/appointments':  'Appointments',
  '/patient/results':       'Test Results',
  '/patient/prescriptions': 'Prescriptions',
  '/patient/emergency':     'Emergency',
};

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const title = TITLES[location.pathname] || 'MedCare HMS';
  const now = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div>
      <Sidebar activePath={location.pathname} onNavigate={navigate} />

      <header className="topbar">
        <div className="topbar-title">{title}</div>
        <div className="topbar-meta">{now}</div>
        <div className="topbar-actions">
          <button className="topbar-btn" title="Notifications">
            <Icon name="bell" size={14} />
            <span className="notif-dot" />
          </button>
          <div className="topbar-avatar" title={user?.name}>
            {user?.avatar || 'U'}
          </div>
        </div>
      </header>

      <main className="app-layout">
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
