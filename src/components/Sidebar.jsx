import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from './Icons';

const NAV = {
  admin: [
    { section: 'Overview', links: [
      { label: 'Command Centre', icon: 'home',      path: '/admin/dashboard' },
    ]},
    { section: 'Operations', links: [
      { label: 'Bed Management', icon: 'bed',       path: '/admin/beds' },
      { label: 'Equipment',      icon: 'tool',      path: '/admin/equipment' },
      { label: 'Staff Directory',icon: 'users',     path: '/admin/staff' },
      { label: 'Emergency / ER', icon: 'alerttriangle', path: '/admin/emergency', badge: '3' },
    ]},
  ],
  staff: [
    { section: 'My Work', links: [
      { label: 'Dashboard',         icon: 'home',      path: '/staff/dashboard' },
      { label: 'My Schedule',       icon: 'clock',     path: '/staff/schedule' },
    ]},
    { section: 'Patients', links: [
      { label: 'Assigned Patients', icon: 'users',     path: '/staff/patients' },
      { label: 'Clinical Notes',    icon: 'clipboard', path: '/staff/notes' },
    ]},
    { section: 'Alerts', links: [
      { label: 'Alerts',            icon: 'bell',      path: '/staff/alerts', badge: '2' },
    ]},
  ],
  patient: [
    { section: 'My Health', links: [
      { label: 'Dashboard',         icon: 'home',      path: '/patient/dashboard' },
      { label: 'Appointments',      icon: 'calendar',  path: '/patient/appointments' },
      { label: 'Test Results',      icon: 'flask',     path: '/patient/results' },
      { label: 'Prescriptions',     icon: 'pill',      path: '/patient/prescriptions' },
    ]},
    { section: 'Support', links: [
      { label: 'Emergency',         icon: 'ambulance', path: '/patient/emergency' },
    ]},
  ],
};

export default function Sidebar({ activePath, onNavigate }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  const nav = NAV[user.role] || [];
  const roleLabel = user.role === 'admin' ? 'Administrator' : user.role === 'staff' ? 'Clinical Staff' : 'Patient';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <Icon name="crosshair" size={14} />
        </div>
        <div>
          <div className="sidebar-logo-name">MedCare HMS</div>
          <div className="sidebar-logo-sub">{roleLabel}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(sec => (
          <div key={sec.section}>
            <div className="sidebar-section">{sec.section}</div>
            {sec.links.map(link => {
              const active = activePath === link.path || activePath?.startsWith(link.path + '/');
              return (
                <button
                  key={link.path}
                  className={`nav-link${active ? ' active' : ''}`}
                  onClick={() => onNavigate(link.path)}
                >
                  <span className="nav-link-icon"><Icon name={link.icon} size={15} /></span>
                  <span style={{ flex: 1 }}>{link.label}</span>
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user.avatar || user.name?.slice(0,2).toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">{user.employeeId || user.patientId || user.email}</div>
          </div>
        </div>
        <button
          className="nav-link"
          onClick={logout}
          style={{ color: '#F87171', marginTop: 2 }}
        >
          <span className="nav-link-icon"><Icon name="logout" size={15} /></span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
