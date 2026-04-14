import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from '../../components/Icons';

const ROLES = [
  { value: 'patient', label: 'Patient',        desc: 'Book appointments, view results and prescriptions' },
  { value: 'staff',   label: 'Staff / Doctor', desc: 'Manage patients, schedules and clinical records' },
  { value: 'admin',   label: 'Administrator',  desc: 'Full access to hospital management and reporting' },
];

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState('');

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().split(' ').length < 2) e.name = 'Enter full name (first and last)';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!form.role) e.role = 'Select a role';
    return e;
  };

  const submit = async ev => {
    ev.preventDefault();
    setServerErr('');
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const res = await register(form);
    if (!res.success) { setServerErr(res.error); return; }
    const r = res.user.role;
    navigate(r === 'admin' ? '/admin/dashboard' : r === 'staff' ? '/staff/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="auth-root">
      <div className="auth-panel-left">
        <div className="auth-brand-logo">
          <div className="auth-brand-mark"><Icon name="crosshair" size={18} /></div>
          <div>
            <div className="auth-brand-name">MedCare HMS</div>
            <div className="auth-brand-tagline">Hospital Management System</div>
          </div>
        </div>

        <div className="auth-brand-headline">Create Your MedCare Account</div>
        <div className="auth-brand-body">
          Register to access the MedCare platform. Your access level and available features
          will be determined by your role.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          {ROLES.map(r => (
            <div key={r.value} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{r.label}</div>
              <div style={{ fontSize: 12, color: 'var(--sidebar-text)', lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div className="auth-stats">
          {[['HIPAA', 'Compliant'], ['256-bit', 'Encrypted'], ['ISO 27001', 'Certified']].map(([v, l]) => (
            <div key={l}>
              <div className="auth-stat-value" style={{ fontSize: 14 }}>{v}</div>
              <div className="auth-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-panel-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Create Account</div>
          <div className="auth-form-subtitle">All fields are required</div>

          {serverErr && (
            <div className="alert alert-red" style={{ marginBottom: 16 }}>
              <Icon name="alerttriangle" size={14} />
              <span>{serverErr}</span>
            </div>
          )}

          <form onSubmit={submit} noValidate>
            {/* Role */}
            <div className="form-field">
              <label className="form-label">Account Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, role: r.value }))}
                    style={{
                      flex: 1,
                      padding: '9px 6px',
                      border: `1px solid ${form.role === r.value ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--r-sm)',
                      background: form.role === r.value ? 'var(--blue-bg)' : 'var(--bg-subtle)',
                      color: form.role === r.value ? 'var(--primary)' : 'var(--text-secondary)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.1s',
                      textAlign: 'center',
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              {errors.role && <div className="field-error">{errors.role}</div>}
            </div>

            <div className="form-field">
              <label className="form-label">Full Name</label>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="user" size={14} /></span>
                <input type="text" className={`form-input${errors.name ? ' error' : ''}`}
                  placeholder="Dr. Firstname Lastname" value={form.name} onChange={set('name')} autoComplete="name" />
              </div>
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            <div className="form-field">
              <label className="form-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="mail" size={14} /></span>
                <input type="email" className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="name@hospital.in" value={form.email} onChange={set('email')} autoComplete="email" />
              </div>
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="grid-2">
              <div className="form-field">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><Icon name="lock" size={14} /></span>
                  <input type={showPw ? 'text' : 'password'}
                    className={`form-input has-right${errors.password ? ' error' : ''}`}
                    placeholder="Min. 6 characters" value={form.password} onChange={set('password')} autoComplete="new-password" />
                  <button type="button" className="input-icon-right" onClick={() => setShowPw(s => !s)}>
                    <Icon name={showPw ? 'eyeoff' : 'eye'} size={14} />
                  </button>
                </div>
                {errors.password && <div className="field-error">{errors.password}</div>}
              </div>

              <div className="form-field">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><Icon name="lock" size={14} /></span>
                  <input type="password" className={`form-input${errors.confirm ? ' error' : ''}`}
                    placeholder="Re-enter password" value={form.confirm} onChange={set('confirm')} autoComplete="new-password" />
                </div>
                {errors.confirm && <div className="field-error">{errors.confirm}</div>}
                {!errors.confirm && form.confirm && form.confirm === form.password && (
                  <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 4, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Icon name="check" size={11} /> Passwords match
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
