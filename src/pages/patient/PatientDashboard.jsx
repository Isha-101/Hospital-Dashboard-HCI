import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { patientAppointments, testResults, prescriptions } from '../../data/mockData';
import { Icon } from '../../components/Icons';

const nextAppt = patientAppointments.find(a => a.status !== 'completed');
const activeRx  = prescriptions.filter(p => p.status === 'active');
const abnormal  = testResults.filter(t => t.status !== 'normal');

const statusBadge = s => {
  if (s === 'normal')    return <span className="badge badge-green">Normal</span>;
  if (s === 'attention') return <span className="badge badge-amber">Attention</span>;
  if (s === 'critical')  return <span className="badge badge-red">Critical</span>;
  return <span className="badge badge-neutral">{s}</span>;
};

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Abnormal result notice */}
      {abnormal.length > 0 && (
        <div className="alert alert-amber fade-in">
          <Icon name="alerttriangle" size={14} />
          <span>
            <strong>Action required:</strong> {abnormal.length} test result{abnormal.length > 1 ? 's' : ''} require attention.
            Please consult your doctor.
          </span>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/patient/results')}>
            View
          </button>
        </div>
      )}

      {/* KPI row */}
      <div className="kpi-grid">
        <div className="kpi-card blue" style={{ cursor: 'pointer' }} onClick={() => navigate('/patient/appointments')}>
          <div className="kpi-icon"><Icon name="calendar" size={16} /></div>
          <div className="kpi-value">{patientAppointments.filter(a => a.status !== 'completed').length}</div>
          <div className="kpi-label">Upcoming Appointments</div>
          <div className="kpi-sub">{nextAppt ? `Next: ${nextAppt.date}` : 'None scheduled'}</div>
        </div>
        <div className={`kpi-card ${abnormal.length > 0 ? 'red' : 'green'}`} style={{ cursor: 'pointer' }} onClick={() => navigate('/patient/results')}>
          <div className="kpi-icon"><Icon name="flask" size={16} /></div>
          <div className="kpi-value">{testResults.length}</div>
          <div className="kpi-label">Test Results</div>
          <div className="kpi-sub">{abnormal.length > 0 ? `${abnormal.length} need attention` : 'All within range'}</div>
        </div>
        <div className="kpi-card amber" style={{ cursor: 'pointer' }} onClick={() => navigate('/patient/prescriptions')}>
          <div className="kpi-icon"><Icon name="pill" size={16} /></div>
          <div className="kpi-value">{activeRx.length}</div>
          <div className="kpi-label">Active Prescriptions</div>
          <div className="kpi-sub">Refills available</div>
        </div>
        <div className="kpi-card blue" style={{ cursor: 'pointer' }} onClick={() => navigate('/patient/emergency')}>
          <div className="kpi-icon"><Icon name="ambulance" size={16} /></div>
          <div className="kpi-value">28 min</div>
          <div className="kpi-label">ER Wait Time</div>
          <div className="kpi-sub">MedCare Central</div>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Test results list */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Test Results</div>
              <div className="card-subtitle">Latest lab and radiology reports</div>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate('/patient/results')}>
              View all <Icon name="chevronright" size={12} />
            </button>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Ordered By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {testResults.slice(0, 5).map(r => (
                  <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/patient/results')}>
                    <td style={{ fontWeight: 600 }}>{r.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.type}</td>
                    <td className="mono" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.orderedBy}</td>
                    <td>{statusBadge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Patient info */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Patient Information</div>
            </div>
            <div style={{ padding: '4px 18px 14px' }}>
              {[
                ['Patient ID',    user?.patientId || 'PAT-20890'],
                ['Blood Group',   user?.bloodGroup || 'O+'],
                ['Date of Birth', user?.dateOfBirth || '15 Mar 1990'],
                ['Phone',         user?.phone || '+91-98765-43210'],
                ['Insurance',     user?.insurance?.provider || 'Star Health Insurance'],
                ['Policy No.',    user?.insurance?.policyNo || 'SH-2090-7734'],
              ].map(([l, v]) => (
                <div className="info-row" key={l}>
                  <span className="info-label">{l}</span>
                  <span className="info-value mono" style={{ fontFamily: l === 'Insurance' ? 'inherit' : undefined }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency contact */}
          <div className="card" style={{ borderLeft: '3px solid var(--red)' }}>
            <div className="card-header">
              <div>
                <div className="card-title" style={{ color: 'var(--red)' }}>Emergency Contact</div>
              </div>
              <Icon name="phone" size={14} style={{ color: 'var(--red)' }} />
            </div>
            <div style={{ padding: '4px 18px 14px' }}>
              {[
                ['Name',     user?.emergencyContact?.name     || 'Ramesh Krishnan'],
                ['Relation', user?.emergencyContact?.relation || 'Spouse'],
                ['Phone',    user?.emergencyContact?.phone    || '+91-98765-99001'],
              ].map(([l, v]) => (
                <div className="info-row" key={l}>
                  <span className="info-label">{l}</span>
                  <span className="info-value">{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 18px 14px' }}>
              <button className="btn btn-danger btn-full" onClick={() => navigate('/patient/emergency')}>
                <Icon name="ambulance" size={13} /> View Emergency Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming appointment */}
      {nextAppt && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Next Appointment</div>
              <div className="card-subtitle">Confirmed upcoming visit</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/patient/appointments')}>
              All Appointments
            </button>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              ['Appointment ID', nextAppt.id],
              ['Date & Time',    `${nextAppt.date}  ${nextAppt.time}`],
              ['Doctor',         nextAppt.doctor],
              ['Department',     nextAppt.department],
              ['Type',           nextAppt.type],
              ['Location',       nextAppt.location],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active prescriptions */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Active Prescriptions</div>
            <div className="card-subtitle">{activeRx.length} current medications</div>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/patient/prescriptions')}>
            View all <Icon name="chevronright" size={12} />
          </button>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Medication</th><th>Brand</th><th>Dosage</th><th>Frequency</th><th>Prescribed By</th><th>Expires</th></tr>
            </thead>
            <tbody>
              {activeRx.map(rx => (
                <tr key={rx.id}>
                  <td style={{ fontWeight: 600 }}>{rx.medication}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{rx.brandName}</td>
                  <td className="mono">{rx.dosage}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{rx.frequency}</td>
                  <td>{rx.doctor}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{rx.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
