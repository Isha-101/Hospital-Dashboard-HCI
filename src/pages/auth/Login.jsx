import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from '../../components/Icons';

const DEMO = [
  { role: 'Admin',   email: 'admin@medcare.in',   password: 'admin123' },
  { role: 'Staff',   email: 'staff@medcare.in',   password: 'staff123' },
  { role: 'Patient', email: 'patient@medcare.in', password: 'patient123' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState('');

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const submit = async ev => {
    ev.preventDefault();
    setServerErr('');
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const res = await login(form.email, form.password);
    if (!res.success) { setServerErr(res.error); return; }
    const r = res.user.role;
    navigate(r === 'admin' ? '/admin/dashboard' : r === 'staff' ? '/staff/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="auth-root">
      {/* Left panel */}
      <div className="auth-panel-left">
        <div className="auth-brand-logo">
          <div className="auth-brand-mark">
            <Icon name="crosshair" size={18} />
          </div>
          <div>
            <div className="auth-brand-name">MedCare</div>
            <div className="auth-brand-tagline">Hospital Management System</div>
          </div>
        </div>

        <div className="auth-brand-headline">
          Integrated Clinical &amp; Operations Platform
        </div>
        <div className="auth-brand-body">
          Centralised management for patient records, clinical workflows,
          staff operations and hospital administration built for healthcare institutions.
        </div>

        <div className="auth-feature-list">
          {[
            'Role-based access for Admin, Staff and Patients',
            'Real-time bed management and ER monitoring',
            'Clinical notes, prescriptions and test results',
            'Appointment scheduling and patient portal',
            'Equipment tracking and maintenance logs',
          ].map(t => (
            <div key={t} className="auth-feature-item">
              <div className="auth-feature-dot" />
              {t}
            </div>
          ))}
        </div>

        <div className="auth-stats">
          {[['320+', 'Beds'], ['148', 'Staff'], ['24/7', 'ER Support']].map(([v, l]) => (
            <div key={l}>
              <div className="auth-stat-value">{v}</div>
              <div className="auth-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-panel-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Sign In</div>
          <div className="auth-form-subtitle">Enter your credentials to access the system</div>

          {/* Demo access */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
              Demo Access
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {DEMO.map(d => (
                <button
                  key={d.role}
                  type="button"
                  className="demo-pill"
                  onClick={() => setForm({ email: d.email, password: d.password })}
                >
                  {d.role}
                </button>
              ))}
            </div>
          </div>

          {serverErr && (
            <div className="alert alert-red" style={{ marginBottom: 16 }}>
              <Icon name="alerttriangle" size={14} />
              <span>{serverErr}</span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            <div className="form-field">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="mail" size={14} /></span>
                <input
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="doctor@medcare.in"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </div>
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="form-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <a href="#" style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="lock" size={14} /></span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`form-input has-right${errors.password ? ' error' : ''}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="current-password"
                />
                <button type="button" className="input-icon-right" onClick={() => setShowPw(s => !s)}>
                  <Icon name={showPw ? 'eyeoff' : 'eye'} size={14} />
                </button>
              </div>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
            New user?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Create account
            </Link>
          </div>

          <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Access Level
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['Admin', 'admin@medcare.in', 'admin123'],
                ['Staff / Doctor', 'staff@medcare.in', 'staff123'],
                ['Patient', 'patient@medcare.in', 'patient123'],
              ].map(([r, e, p]) => (
                <div key={r} style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 80, fontWeight: 600 }}>{r}</span>
                  <span className="mono">{e}</span>
                  <span style={{ color: 'var(--text-muted)' }}>/</span>
                  <span className="mono">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
