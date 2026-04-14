import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: 'admin-001',
    name: 'Dr. Meera Pillai',
    email: 'admin@medcare.in',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    avatar: 'MP',
    employeeId: 'ADM-001',
  },
  {
    id: 'staff-001',
    name: 'Dr. Rajesh Sharma',
    email: 'staff@medcare.in',
    password: 'staff123',
    role: 'staff',
    department: 'Cardiology',
    avatar: 'RS',
    employeeId: 'DOC-042',
    specialization: 'Interventional Cardiologist',
  },
  {
    id: 'patient-001',
    name: 'Ananya Krishnan',
    email: 'patient@medcare.in',
    password: 'patient123',
    role: 'patient',
    avatar: 'AK',
    patientId: 'PAT-20890',
    dateOfBirth: '1990-03-15',
    bloodGroup: 'O+',
    phone: '+91-98765-43210',
    address: '42-B, Sector 14, Rohini, New Delhi 110085',
    emergencyContact: { name: 'Ramesh Krishnan', relation: 'Spouse', phone: '+91-98765-99001' },
    insurance: { provider: 'Star Health & Allied Insurance', policyNo: 'SH-2090-7734', validity: '2025-12-31' },
  },
];

const STORAGE_KEY = 'medcare_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    setLoading(false);
    if (!found) return { success: false, error: 'Invalid credentials. Please check your email and password.' };
    const { password: _pw, ...safe } = found;
    setUser(safe);
    return { success: true, user: safe };
  };

  const register = async ({ name, email, password, role }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `${role}-${Date.now()}`,
      name, email, role,
      avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      patientId:  role === 'patient' ? `PAT-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      employeeId: role !== 'patient' ? `EMP-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      department: role === 'admin' ? 'Administration' : role === 'staff' ? 'General Medicine' : undefined,
    };
    MOCK_USERS.push({ ...newUser, password });
    setLoading(false);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
