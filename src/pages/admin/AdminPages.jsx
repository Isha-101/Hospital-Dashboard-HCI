import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminKPIs, bedData, staffList, erData, equipmentData } from '../../data/mockData';
import { Icon } from '../../components/Icons';

// ─── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
export function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {erData.alerts.filter(a => a.type === 'critical').map(a => (
        <div key={a.id} className="alert alert-red fade-in">
          <Icon name="alerttriangle" size={14} />
          <strong>ER Alert:</strong> {a.message}
          <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>{a.time}</span>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/admin/emergency')}>View ER</button>
        </div>
      ))}

      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'bed',           value:`${adminKPIs.occupiedBeds}/${adminKPIs.totalBeds}`, label:'Beds Occupied',   sub:`${adminKPIs.availableBeds} available` },
          { color:'red',   icon:'alerttriangle', value:adminKPIs.erPatients,                              label:'ER Patients',     sub:`${adminKPIs.erWaitTime} min avg wait` },
          { color:'blue',  icon:'users',         value:`${adminKPIs.activeStaff}/${adminKPIs.totalStaff}`,label:'Staff on Duty',   sub:'Active today' },
          { color:'green', icon:'stethoscope',   value:adminKPIs.surgeriesToday,                          label:'Surgeries Today', sub:'Scheduled' },
          { color:'green', icon:'activity',      value:adminKPIs.admissionsToday,                         label:'Admissions',      sub:'Today' },
          { color:'blue',  icon:'filetext',      value:adminKPIs.dischargeToday,                          label:'Discharges',      sub:'Today' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Ward occupancy */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Ward Occupancy</div>
              <div className="card-subtitle">Live bed status</div>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate('/admin/beds')}>Full View <Icon name="chevronright" size={12} /></button>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {bedData.map(w => (
              <div key={w.ward}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                  <span style={{ fontWeight: 500 }}>{w.ward}</span>
                  <span className="mono" style={{ fontWeight: 700, color: w.load > 85 ? 'var(--red)' : w.load > 70 ? 'var(--amber)' : 'var(--green)' }}>
                    {w.occupied}/{w.total}
                  </span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${w.load}%`, background: w.load > 85 ? 'var(--red)' : w.load > 70 ? 'var(--amber)' : 'var(--green)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ER Status */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Emergency Room Status</div>
              <div className="card-subtitle">Live</div>
            </div>
            <span className="badge badge-green">Live</span>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { v: `${erData.currentWaitTime} min`, l: 'Wait Time' },
                { v: `${erData.erLoad}%`,             l: 'ER Load'   },
                { v: erData.criticalCases,            l: 'Critical'  },
              ].map(s => (
                <div key={s.l} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '10px 8px', textAlign: 'center' }}>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            {erData.alerts.map(a => (
              <div key={a.id} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
                <Icon name="alerttriangle" size={13} style={{ color: a.type === 'critical' ? 'var(--red)' : a.type === 'warning' ? 'var(--amber)' : 'var(--primary)', marginTop: 1, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5 }}>{a.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff on duty */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Staff On Duty</div>
          <button className="btn btn-ghost" onClick={() => navigate('/admin/staff')}>Directory <Icon name="chevronright" size={12} /></button>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Staff Member</th><th>Role</th><th>Department</th><th>Shift</th><th>Patients</th><th>Status</th></tr></thead>
            <tbody>
              {staffList.slice(0, 6).map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{s.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.role}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.department}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.shift}</td>
                  <td className="mono">{s.patients || '—'}</td>
                  <td>{s.status === 'active' ? <span className="badge badge-green">Active</span> : <span className="badge badge-amber">On-Call</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN BEDS ────────────────────────────────────────────────────────────────
export function AdminBeds() {
  const totals = { total: bedData.reduce((s,w)=>s+w.total,0), occupied: bedData.reduce((s,w)=>s+w.occupied,0) };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'bed',    value:totals.total,              label:'Total Beds',     sub:'All wards' },
          { color:'red',   icon:'users',  value:totals.occupied,           label:'Occupied',       sub:`${Math.round(totals.occupied/totals.total*100)}% occupancy` },
          { color:'green', icon:'check',  value:totals.total-totals.occupied,label:'Available',    sub:'Ready for admission' },
          { color:'blue',  icon:'building',value:bedData.length,           label:'Wards / Units',  sub:'Active' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Ward-wise Bed Occupancy</div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Ward / Unit</th><th>Total Beds</th><th>Occupied</th><th>Available</th><th>Occupancy</th><th>Load Status</th></tr></thead>
            <tbody>
              {bedData.map(w => (
                <tr key={w.ward}>
                  <td style={{ fontWeight: 600 }}>{w.ward}</td>
                  <td className="mono">{w.total}</td>
                  <td className="mono" style={{ fontWeight: 700 }}>{w.occupied}</td>
                  <td className="mono" style={{ fontWeight: 700, color: w.total-w.occupied < 5 ? 'var(--red)' : 'var(--green)' }}>{w.total - w.occupied}</td>
                  <td style={{ minWidth: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-track" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${w.load}%`, background: w.load > 85 ? 'var(--red)' : w.load > 70 ? 'var(--amber)' : 'var(--green)' }} />
                      </div>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: w.load > 85 ? 'var(--red)' : w.load > 70 ? 'var(--amber)' : 'var(--green)', minWidth: 36 }}>{w.load}%</span>
                    </div>
                  </td>
                  <td>{w.load > 85 ? <span className="badge badge-red">Critical</span> : w.load > 70 ? <span className="badge badge-amber">High</span> : <span className="badge badge-green">Normal</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN EQUIPMENT ───────────────────────────────────────────────────────────
export function AdminEquipment() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? equipmentData : equipmentData.filter(e => e.status === filter);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'tool',   value:equipmentData.length,                                     label:'Total Equipment', sub:'Tracked assets' },
          { color:'blue',  icon:'activity',value:equipmentData.filter(e=>e.status==='in-use').length,     label:'In Use',          sub:'Deployed' },
          { color:'green', icon:'check',   value:equipmentData.filter(e=>e.status==='available').length,  label:'Available',       sub:'Ready' },
          { color:'amber', icon:'tool',    value:equipmentData.filter(e=>e.status==='maintenance').length, label:'Maintenance',    sub:'Under service' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Equipment Inventory</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all','in-use','available','maintenance'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding:'4px 10px', borderRadius:'var(--r-sm)', border:`1px solid ${filter===f?'var(--primary)':'var(--border)'}`,
                  background: filter===f?'var(--primary)':'var(--bg-surface)', color: filter===f?'#fff':'var(--text-secondary)',
                  fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all 0.1s' }}>
                {f.charAt(0).toUpperCase()+f.slice(1).replace('-',' ')}
              </button>
            ))}
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Equipment</th><th>Category</th><th>Location</th><th>Last Serviced</th><th>Next Service</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(eq => (
                <tr key={eq.id}>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{eq.id}</td>
                  <td style={{ fontWeight: 600 }}>{eq.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{eq.category}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{eq.location}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{eq.lastService}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{eq.nextService}</td>
                  <td>{eq.status === 'in-use' ? <span className="badge badge-blue">In Use</span> : eq.status === 'available' ? <span className="badge badge-green">Available</span> : <span className="badge badge-amber">Maintenance</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN STAFF ────────────────────────────────────────────────────────────────
export function AdminStaff() {
  const [search, setSearch] = useState('');
  const filtered = staffList.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'users', value:staffList.length,                                label:'Total Staff' },
          { color:'blue',  icon:'stethoscope', value:staffList.filter(s=>s.role==='Doctor').length, label:'Doctors' },
          { color:'green', icon:'activity', value:staffList.filter(s=>s.role==='Nurse').length, label:'Nurses' },
          { color:'amber', icon:'clipboard', value:staffList.filter(s=>s.role==='Admin').length, label:'Admin Staff' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">Staff Directory</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Icon name="search" size={13} /></span>
            <input type="text" placeholder="Search staff…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: '6px 10px 6px 28px', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontFamily: 'inherit', fontSize: 13, outline: 'none', width: 220 }} />
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Staff Member</th><th>Role</th><th>Department</th><th>Specialisation</th><th>Shift</th><th>Patients</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{s.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.role}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{s.department}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{s.specialization}</td>
                  <td>{s.shift}</td>
                  <td className="mono">{s.patients || '—'}</td>
                  <td>{s.status === 'active' ? <span className="badge badge-green">Active</span> : <span className="badge badge-amber">On-Call</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN EMERGENCY ──────────────────────────────────────────────────────────
export function AdminEmergency() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'var(--sidebar-bg)', border: '1px solid #243552', borderRadius: 'var(--r-md)', padding: '18px 24px', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--sidebar-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>ER Command</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>ER Status — High Load</div>
          <div style={{ fontSize: 13, color: 'var(--sidebar-text)' }}>{erData.occupiedBays}/{erData.totalBays} bays occupied — {erData.staffOnDuty} staff on duty</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginLeft: 'auto' }}>
          {[{ v: `${erData.currentWaitTime} min`, l: 'Wait Time' }, { v: `${erData.erLoad}%`, l: 'Load' }, { v: erData.criticalCases, l: 'Critical' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid #243552', borderRadius: 'var(--r-sm)', padding: '10px 16px' }}>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--sidebar-text)', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="kpi-grid">
        {[
          { color:'red',   icon:'alerttriangle', value:erData.criticalCases, label:'Critical' },
          { color:'amber', icon:'activity',       value:erData.moderateCases, label:'Moderate' },
          { color:'green', icon:'check',          value:erData.minorCases,    label:'Minor' },
          { color:'blue',  icon:'users',          value:erData.staffOnDuty,   label:'Staff On Duty' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Active ER Alerts</div>
          <span className="badge badge-green">Live</span>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th>Severity</th><th>Alert</th><th>Time</th></tr></thead>
            <tbody>
              {erData.alerts.map(a => (
                <tr key={a.id}>
                  <td>{a.type === 'critical' ? <span className="badge badge-red">Critical</span> : a.type === 'warning' ? <span className="badge badge-amber">Warning</span> : <span className="badge badge-blue">Info</span>}</td>
                  <td style={{ fontWeight: 500 }}>{a.message}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
