import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { assignedPatients, staffSchedule, staffAlerts } from '../../data/mockData';
import { Icon } from '../../components/Icons';

const condBadge = c => ({
  stable:   <span className="badge badge-green">Stable</span>,
  fair:     <span className="badge badge-amber">Fair</span>,
  critical: <span className="badge badge-red">Critical</span>,
}[c] || <span className="badge badge-neutral">{c}</span>);

// ─── STAFF DASHBOARD ───────────────────────────────────────────────────────────
export function StaffDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const unread = staffAlerts.filter(a => !a.acknowledged);
  const critical = assignedPatients.filter(p => p.condition === 'critical');
  const todayShift = staffSchedule.weeklyShifts.find(s => s.status === 'today');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Critical alerts */}
      {unread.filter(a => a.type === 'critical').map(a => (
        <div key={a.id} className="alert alert-red fade-in">
          <Icon name="alerttriangle" size={14} />
          <strong>{a.title}</strong> — {a.message}
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/staff/alerts')}>View</button>
        </div>
      ))}

      {/* Staff info strip */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '14px 18px', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
            {user?.avatar}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.employeeId} — {user?.department}</div>
          </div>
        </div>
        <div style={{ height: 32, width: 1, background: 'var(--border)' }} />
        {todayShift && (
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Today's Shift</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{todayShift.shift} — {todayShift.department}</div>
          </div>
        )}
        <div style={{ height: 32, width: 1, background: 'var(--border)' }} />
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Ward</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{todayShift?.ward || 'Ward 2B'}</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card blue" style={{ cursor: 'pointer' }} onClick={() => navigate('/staff/patients')}>
          <div className="kpi-icon"><Icon name="users" size={16} /></div>
          <div className="kpi-value">{assignedPatients.length}</div>
          <div className="kpi-label">Assigned Patients</div>
          <div className="kpi-sub">Today</div>
        </div>
        <div className="kpi-card red" style={{ cursor: 'pointer' }} onClick={() => navigate('/staff/patients')}>
          <div className="kpi-icon"><Icon name="alerttriangle" size={16} /></div>
          <div className="kpi-value">{critical.length}</div>
          <div className="kpi-label">Critical Cases</div>
          <div className="kpi-sub">Requires monitoring</div>
        </div>
        <div className="kpi-card blue" style={{ cursor: 'pointer' }} onClick={() => navigate('/staff/schedule')}>
          <div className="kpi-icon"><Icon name="clock" size={16} /></div>
          <div className="kpi-value">{staffSchedule.weeklyShifts.filter(s => s.status !== 'off').length}</div>
          <div className="kpi-label">Shifts This Week</div>
          <div className="kpi-sub">2 remaining</div>
        </div>
        <div className="kpi-card amber" style={{ cursor: 'pointer' }} onClick={() => navigate('/staff/alerts')}>
          <div className="kpi-icon"><Icon name="bell" size={16} /></div>
          <div className="kpi-value">{unread.length}</div>
          <div className="kpi-label">Unread Alerts</div>
          <div className="kpi-sub">Action required</div>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Patients */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Assigned Patients</div>
              <div className="card-subtitle">Current patient list</div>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate('/staff/patients')}>
              View all <Icon name="chevronright" size={12} />
            </button>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Patient</th><th>Room</th><th>Diagnosis</th><th>Condition</th><th>Progress</th></tr></thead>
              <tbody>
                {assignedPatients.slice(0, 4).map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id} — {p.age}y {p.sex}</div>
                    </td>
                    <td className="mono" style={{ color: 'var(--text-secondary)' }}>{p.room}</td>
                    <td style={{ color: 'var(--text-secondary)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.diagnosis}</td>
                    <td>{condBadge(p.condition)}</td>
                    <td style={{ minWidth: 100 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="progress-track" style={{ flex: 1 }}>
                          <div className="progress-fill" style={{ width: `${p.treatmentProgress}%`, background: p.treatmentProgress > 70 ? 'var(--green)' : p.treatmentProgress > 40 ? 'var(--amber)' : 'var(--red)' }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', flexShrink: 0 }}>{p.treatmentProgress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly schedule */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">This Week's Shifts</div>
            <button className="btn btn-ghost" onClick={() => navigate('/staff/schedule')}>Full <Icon name="chevronright" size={12} /></button>
          </div>
          <div>
            {staffSchedule.weeklyShifts.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 18px', borderBottom: '1px solid var(--border)',
                background: s.status === 'today' ? 'var(--blue-bg)' : 'transparent',
                borderLeft: s.status === 'today' ? '3px solid var(--primary)' : '3px solid transparent' }}>
                <div style={{ width: 28, fontSize: 12, fontWeight: 700, color: s.status === 'off' ? 'var(--text-muted)' : s.status === 'today' ? 'var(--primary)' : 'var(--text-secondary)', flexShrink: 0 }}>
                  {s.day.slice(0, 3)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: s.status === 'off' ? 'var(--text-muted)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.shift}</div>
                  {s.status !== 'off' && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.department}</div>}
                </div>
                {s.status === 'today' && <span className="badge badge-blue">Today</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STAFF SCHEDULE ────────────────────────────────────────────────────────────
export function StaffSchedule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Weekly Schedule</div>
            <div className="card-subtitle">Week of 24 Feb – 2 Mar 2025</div>
          </div>
          <span className="badge badge-blue">Week 9</span>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Day</th><th>Shift</th><th>Department</th><th>Ward</th><th>Patients</th><th>Status</th></tr></thead>
            <tbody>
              {staffSchedule.weeklyShifts.map((s, i) => (
                <tr key={i} style={{ background: s.status === 'today' ? 'var(--blue-bg)' : undefined }}>
                  <td style={{ fontWeight: 700, color: s.status === 'today' ? 'var(--primary)' : undefined }}>{s.day}</td>
                  <td style={{ color: s.status === 'off' ? 'var(--text-muted)' : undefined }}>{s.shift}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.department}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.ward}</td>
                  <td className="mono" style={{ color: s.patients === 0 ? 'var(--text-muted)' : undefined }}>{s.patients || '—'}</td>
                  <td>
                    {s.status === 'today' ? <span className="badge badge-blue">Today</span>
                      : s.status === 'completed' ? <span className="badge badge-neutral">Completed</span>
                      : s.status === 'off' ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Off</span>
                      : <span className="badge badge-green">Upcoming</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ASSIGNED PATIENTS ─────────────────────────────────────────────────────────
export function AssignedPatients() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = assignedPatients.filter(p => {
    const mf = filter === 'all' || p.ward.toLowerCase() === filter || p.condition === filter;
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 280 }}>
          <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Icon name="search" size={13} />
          </span>
          <input type="text" placeholder="Search by name or ID…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', height: 34, padding: '0 10px 0 30px', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} />
        </div>
        {['all', 'ICU', 'General', 'critical', 'stable'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '4px 12px', borderRadius: 'var(--r-sm)', border: `1px solid ${filter === f ? 'var(--primary)' : 'var(--border)'}`,
              background: filter === f ? 'var(--primary)' : 'var(--bg-surface)', color: filter === f ? '#fff' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.1s' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} patient{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="card">
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Patient</th><th>Room</th><th>Ward</th><th>Admitted</th><th>Diagnosis</th><th>Condition</th><th>Progress</th><th>Notes</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ background: p.condition === 'critical' ? 'rgba(185,28,28,0.03)' : undefined }}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id} — {p.age}y {p.sex}</div>
                  </td>
                  <td className="mono" style={{ color: 'var(--text-secondary)' }}>{p.room}</td>
                  <td><span className={`badge ${p.ward === 'ICU' ? 'badge-red' : 'badge-neutral'}`}>{p.ward}</span></td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{p.admissionDate}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.diagnosis}</td>
                  <td>{condBadge(p.condition)}</td>
                  <td style={{ minWidth: 110 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="progress-track" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${p.treatmentProgress}%`, background: p.treatmentProgress > 70 ? 'var(--green)' : p.treatmentProgress > 40 ? 'var(--amber)' : 'var(--red)' }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>{p.treatmentProgress}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CLINICAL NOTES ────────────────────────────────────────────────────────────
export function ClinicalNotes() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('stable');
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!note.trim()) return;
    setSaved(true);
    setNote('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="grid-1-2" style={{ gap: 16 }}>
      <div className="card">
        <div className="card-header"><div className="card-title">Select Patient</div></div>
        <div>
          {assignedPatients.map(p => (
            <div key={p.id} onClick={() => setSelected(p)}
              style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '11px 18px', cursor: 'pointer',
                background: selected?.id === p.id ? 'var(--blue-bg)' : 'transparent',
                borderLeft: `3px solid ${selected?.id === p.id ? 'var(--primary)' : 'transparent'}`,
                borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Room {p.room} — {p.condition}</div>
              </div>
              {condBadge(p.condition)}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Clinical Notes</div>
          {selected && <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>{selected.name}</span>}
        </div>
        <div className="card-body">
          {!selected ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Icon name="clipboard" size={18} /></div>
              <div className="empty-state-title">No patient selected</div>
              <div className="empty-state-desc">Select a patient from the list to add notes.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {saved && <div className="alert alert-green"><Icon name="check" size={13} /> Note saved successfully.</div>}

              {selected.notes && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>Previous Notes</div>
                  <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '10px 12px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {selected.notes}
                  </div>
                </div>
              )}

              <div className="form-field">
                <label className="form-label">Update Condition Status</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="stable">Stable</option>
                  <option value="fair">Fair / Improving</option>
                  <option value="critical">Critical</option>
                  <option value="discharge-ready">Discharge Ready</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Clinical Note</label>
                <textarea className="form-textarea" rows={6} value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Enter clinical observations, treatment updates, medication changes..." />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => { setSelected(null); setNote(''); }}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={save} disabled={!note.trim()}>
                  <Icon name="check" size={13} /> Save Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF ALERTS ──────────────────────────────────────────────────────────────
export function StaffAlertsPage() {
  const [alerts, setAlerts] = useState(staffAlerts);
  const ack = id => setAlerts(a => a.map(al => al.id === id ? { ...al, acknowledged: true } : al));

  const unread = alerts.filter(a => !a.acknowledged);
  const read   = alerts.filter(a => a.acknowledged);

  const alertStyle = { critical: 'alert-red', warning: 'alert-amber', info: 'alert-blue' };

  const renderAlert = a => (
    <div key={a.id} className={`alert ${alertStyle[a.type] || 'alert-blue'}`}
      style={{ opacity: a.acknowledged ? 0.6 : 1, justifyContent: 'flex-start' }}>
      <Icon name={a.type === 'critical' ? 'alerttriangle' : a.type === 'warning' ? 'alerttriangle' : 'info'} size={14} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{a.title}</div>
        <div style={{ fontSize: 12 }}>{a.message}</div>
        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>{a.time}</div>
      </div>
      {!a.acknowledged
        ? <button className="btn btn-secondary btn-sm" onClick={() => ack(a.id)} style={{ flexShrink: 0 }}>Acknowledge</button>
        : <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, flexShrink: 0, display: 'flex', gap: 4, alignItems: 'center' }}><Icon name="check" size={12} /> Done</span>}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {unread.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.6px', display: 'flex', gap: 8, alignItems: 'center' }}>
            Unread Alerts
            <span style={{ background: 'var(--red)', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11 }}>{unread.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{unread.map(renderAlert)}</div>
        </div>
      )}
      {read.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Acknowledged</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{read.map(renderAlert)}</div>
        </div>
      )}
    </div>
  );
}
