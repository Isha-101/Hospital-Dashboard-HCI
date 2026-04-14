// ─── BOOK APPOINTMENT ─────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { departments, timeSlots, patientAppointments } from '../../data/mockData';
import { Icon } from '../../components/Icons';
import { testResults as allResults } from '../../data/mockData';
import { prescriptions as allRx } from '../../data/mockData';
import { emergencyContacts, nearbyHospitals } from '../../data/mockData';

const apptStatusBadge = s => ({
  confirmed: <span className="badge badge-green">Confirmed</span>,
  pending:   <span className="badge badge-amber">Pending</span>,
  completed: <span className="badge badge-neutral">Completed</span>,
}[s] || <span className="badge badge-neutral">{s}</span>);

export function BookAppointment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ dept: '', doctor: '', date: '', type: 'New Consultation', slot: '' });
  const [booked, setBooked] = useState(false);

  const selectedDept = departments.find(d => d.id === form.dept);
  const today = new Date().toISOString().split('T')[0];

  const book = () => {
    setBooked(true);
    setTimeout(() => { setBooked(false); setStep(1); setForm({ dept: '', doctor: '', date: '', type: 'New Consultation', slot: '' }); }, 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {booked && (
        <div className="alert alert-green fade-in">
          <Icon name="check" size={14} />
          <strong>Appointment confirmed.</strong> A confirmation will be sent to your registered email.
        </div>
      )}

      {/* Wizard */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Book Appointment</div>
            <div className="card-subtitle">Step {Math.min(step, 4)} of 4</div>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{ width: s === step ? 24 : 8, height: 8, borderRadius: 4,
                background: s < step ? 'var(--green)' : s === step ? 'var(--primary)' : 'var(--border)',
                transition: 'all 0.2s' }} />
            ))}
          </div>
        </div>

        <div className="card-body">
          {step === 1 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Select Department</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 8 }}>
                {departments.map(dept => (
                  <button key={dept.id} type="button"
                    onClick={() => { setForm(f => ({ ...f, dept: dept.id })); setStep(2); }}
                    style={{ padding: '12px 14px', border: `1px solid ${form.dept === dept.id ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--r-sm)', background: form.dept === dept.id ? 'var(--blue-bg)' : 'var(--bg-subtle)',
                      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.1s' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: form.dept === dept.id ? 'var(--primary)' : 'var(--text-primary)', marginBottom: 3 }}>{dept.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dept.doctors.length} doctor{dept.doctors.length > 1 ? 's' : ''}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="btn btn-ghost btn-sm" style={{ marginBottom: 16, paddingLeft: 0 }}>
                <Icon name="chevronleft" size={13} /> Back
              </button>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{selectedDept?.name} — Select Doctor &amp; Date</div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div className="form-field">
                  <label className="form-label">Doctor</label>
                  <select className="form-select" value={form.doctor} onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}>
                    <option value="">Select doctor</option>
                    {selectedDept?.doctors.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Appointment Type</label>
                  <select className="form-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>New Consultation</option>
                    <option>Follow-up</option>
                    <option>Routine Checkup</option>
                    <option>Post-op Review</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input no-icon" min={today} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
              </div>
              <button className="btn btn-primary" disabled={!form.doctor || !form.date} onClick={() => setStep(3)}>
                View Available Slots <Icon name="chevronright" size={13} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="btn btn-ghost btn-sm" style={{ marginBottom: 16, paddingLeft: 0 }}>
                <Icon name="chevronleft" size={13} /> Back
              </button>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Select Time Slot</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>{form.doctor} — {form.date}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, display: 'flex', gap: 16 }}>
                <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'inline-block' }} /> Available</span>
                <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--primary)', display: 'inline-block' }} /> Selected</span>
                <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--bg-subtle)', border: '1px solid var(--border)', display: 'inline-block' }} /> Booked</span>
              </div>
              <div className="slot-grid" style={{ marginBottom: 20 }}>
                {timeSlots.map(s => (
                  <button key={s.time} className={`slot-btn${!s.available ? ' taken' : form.slot === s.time ? ' selected' : ''}`}
                    disabled={!s.available} onClick={() => s.available && setForm(f => ({ ...f, slot: s.time }))}>
                    {s.time}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" disabled={!form.slot} onClick={() => setStep(4)}>
                Continue with {form.slot || '—'} <Icon name="chevronright" size={13} />
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <button onClick={() => setStep(3)} className="btn btn-ghost btn-sm" style={{ marginBottom: 16, paddingLeft: 0 }}>
                <Icon name="chevronleft" size={13} /> Back
              </button>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Confirm Booking</div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', overflow: 'hidden', marginBottom: 16 }}>
                {[
                  ['Department', selectedDept?.name],
                  ['Doctor', form.doctor],
                  ['Date', form.date],
                  ['Time', form.slot],
                  ['Type', form.type],
                  ['Location', 'MedCare Central Hospital, OPD Block'],
                ].map(([l, v], i, arr) => (
                  <div key={l} style={{ display: 'flex', padding: '11px 16px', borderBottom: i < arr.length-1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'var(--bg-subtle)' : 'var(--bg-surface)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, width: 120, flexShrink: 0 }}>{l}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-blue" style={{ marginBottom: 16 }}>
                <Icon name="info" size={14} />
                Please arrive 15 minutes prior. Carry a valid photo ID and insurance card.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={book}>
                  <Icon name="check" size={13} /> Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Appointment History</div>
            <div className="card-subtitle">{patientAppointments.length} total records</div>
          </div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Appt. ID</th><th>Doctor</th><th>Department</th><th>Type</th><th>Date</th><th>Time</th><th>Location</th><th>Status</th></tr>
            </thead>
            <tbody>
              {patientAppointments.map(a => (
                <tr key={a.id}>
                  <td className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.id}</td>
                  <td style={{ fontWeight: 600 }}>{a.doctor}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.department}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.type}</td>
                  <td className="mono">{a.date}</td>
                  <td className="mono">{a.time}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{a.location}</td>
                  <td>{apptStatusBadge(a.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── TEST RESULTS ──────────────────────────────────────────────────────────────

const resBadge = s => ({
  normal:    <span className="badge badge-green">Normal</span>,
  attention: <span className="badge badge-amber">Attention</span>,
  critical:  <span className="badge badge-red">Critical</span>,
}[s] || <span className="badge badge-neutral">{s}</span>);

export function TestResults() {
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null);

  const filtered = filter === 'all' ? allResults : allResults.filter(r => r.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {allResults.some(r => r.status === 'critical') && (
        <div className="alert alert-red fade-in">
          <Icon name="alerttriangle" size={14} />
          <strong>Critical result found.</strong> Please contact your doctor immediately.
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4 }}>Filter:</span>
        {['all', 'normal', 'attention', 'critical'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '4px 12px', borderRadius: 'var(--r-sm)', border: `1px solid ${filter === f ? 'var(--primary)' : 'var(--border)'}`,
              background: filter === f ? 'var(--primary)' : 'var(--bg-surface)', color: filter === f ? '#fff' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.1s' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Report ID</th><th>Test Name</th><th>Type</th><th>Date</th><th>Ordered By</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ background: r.status === 'critical' ? 'rgba(185,28,28,0.03)' : undefined }}>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.id}</td>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.type}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.orderedBy}</td>
                  <td>{resBadge(r.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setModal(r)}>View</button>
                      <button className="btn btn-ghost btn-sm"><Icon name="download" size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxWidth: 620 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{modal.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {modal.id} — {modal.type} — {modal.date}
                </div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18, lineHeight: 1 }}>
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[['Report ID', modal.id], ['Date', modal.date], ['Ordered By', modal.orderedBy]].map(([l,v]) => (
                  <div key={l} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '8px 12px' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: l === 'Report ID' ? 'monospace' : 'inherit' }}>{v}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center' }}>{resBadge(modal.status)}</div>
              </div>

              {modal.values.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Parameters</div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-subtle)' }}>
                          {['Parameter', 'Result', 'Reference Range', 'Status'].map(h => (
                            <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: '1px solid var(--border)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {modal.values.map(v => (
                          <tr key={v.parameter} style={{ borderBottom: '1px solid var(--border)', background: v.status !== 'normal' ? 'rgba(180,83,9,0.03)' : undefined }}>
                            <td style={{ padding: '10px 14px', fontWeight: 500 }}>{v.parameter}</td>
                            <td style={{ padding: '10px 14px', fontWeight: 700, fontFamily: 'monospace',
                              color: v.status === 'critical' ? 'var(--red)' : v.status === 'attention' ? 'var(--amber)' : 'var(--green)' }}>{v.value}</td>
                            <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: 12 }}>{v.range}</td>
                            <td style={{ padding: '10px 14px' }}>{resBadge(v.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {modal.reportSummary && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Report Summary</div>
                  <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '12px 14px', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7 }}>
                    {modal.reportSummary}
                  </div>
                </div>
              )}

              {modal.status !== 'normal' && (
                <div className="alert alert-amber">
                  <Icon name="alerttriangle" size={14} />
                  This result requires follow-up with {modal.orderedBy}. Please schedule a consultation at the earliest.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Close</button>
              <button className="btn btn-primary btn-sm"><Icon name="download" size={12} /> Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PRESCRIPTIONS ─────────────────────────────────────────────────────────────

export function Prescriptions() {
  const [tab, setTab] = useState('active');
  const [modal, setModal] = useState(null);
  const filtered = allRx.filter(r => tab === 'all' ? true : r.status === tab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="tab-bar">
        {['active', 'completed', 'all'].map(t => (
          <button key={t} className={`tab-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            <span style={{ marginLeft: 6, fontSize: 11, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: 'var(--text-muted)' }}>
              {allRx.filter(r => t === 'all' ? true : r.status === t).length}
            </span>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={12} /> Export</button>
        </div>
      </div>

      <div className="card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Rx ID</th><th>Medication</th><th>Brand</th><th>Dosage</th><th>Frequency</th><th>Prescribed By</th><th>Valid Until</th><th>Refills</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(rx => (
                <tr key={rx.id}>
                  <td className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{rx.id}</td>
                  <td style={{ fontWeight: 600 }}>{rx.medication}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{rx.brandName}</td>
                  <td className="mono">{rx.dosage}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rx.frequency}</td>
                  <td>{rx.doctor}</td>
                  <td className="mono" style={{ color: 'var(--text-muted)' }}>{rx.endDate}</td>
                  <td style={{ textAlign: 'center' }}>{rx.refills > 0 ? <span className="badge badge-blue">{rx.refills}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{rx.status === 'active' ? <span className="badge badge-green">Active</span> : <span className="badge badge-neutral">Completed</span>}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setModal(rx)}>Details</button>
                      <button className="btn btn-ghost btn-sm"><Icon name="download" size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{modal.medication} {modal.dosage}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Prescription {modal.id}</div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <Icon name="x" size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', overflow: 'hidden', marginBottom: 14 }}>
                {[
                  ['Brand Name', modal.brandName], ['Dosage', modal.dosage], ['Frequency', modal.frequency],
                  ['Duration', modal.duration], ['Start Date', modal.startDate], ['End Date', modal.endDate],
                  ['Prescribed By', modal.doctor], ['Department', modal.department], ['Refills', `${modal.refills} remaining`],
                ].map(([l, v], i, arr) => (
                  <div key={l} style={{ display: 'flex', padding: '9px 14px', borderBottom: i < arr.length-1 ? '1px solid var(--border)' : 'none', background: i%2===0 ? 'var(--bg-subtle)' : 'var(--bg-surface)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, width: 130, flexShrink: 0 }}>{l}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-amber">
                <Icon name="info" size={14} />
                <span><strong>Instructions:</strong> {modal.instructions}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setModal(null)}>Close</button>
              <button className="btn btn-primary btn-sm"><Icon name="download" size={12} /> Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PATIENT EMERGENCY ─────────────────────────────────────────────────────────

export function PatientEmergency() {
  const [ambulanceSent, setAmbulanceSent] = useState(false);
  const [waitTime] = useState(28);

  const callAmbulance = () => {
    setAmbulanceSent(true);
    setTimeout(() => setAmbulanceSent(false), 6000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {ambulanceSent && (
        <div className="alert alert-green fade-in">
          <Icon name="ambulance" size={14} />
          <strong>Ambulance dispatched.</strong> Estimated arrival: 8–10 minutes. Keep this line open.
        </div>
      )}

      {/* Emergency call bar */}
      <div style={{ background: 'var(--sidebar-bg)', border: '1px solid #243552', borderRadius: 'var(--r-md)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--sidebar-text)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>National Emergency Number</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#fff', fontFamily: 'monospace', letterSpacing: 2 }}>112</div>
          <div style={{ fontSize: 12, color: 'var(--sidebar-text)', marginTop: 4 }}>Call 112 for all life-threatening emergencies</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="tel:112">
            <button className="btn btn-danger-fill">
              <Icon name="phone" size={14} /> Call 112
            </button>
          </a>
          <button className="btn btn-secondary" onClick={callAmbulance} disabled={ambulanceSent}
            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderColor: '#243552' }}>
            <Icon name="ambulance" size={14} /> Request Ambulance (108)
          </button>
        </div>
      </div>

      {/* ER status */}
      <div className="kpi-grid">
        {[
          { color: 'amber', icon: 'clock',    value: `${waitTime} min`, label: 'Current ER Wait', sub: 'MedCare Central' },
          { color: 'red',   icon: 'activity', value: '80%',            label: 'ER Occupancy',    sub: '24 of 30 bays' },
          { color: 'blue',  icon: 'users',    value: '8',              label: 'Staff On Duty',   sub: 'Doctors + Nurses' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color}`}>
            <div className="kpi-icon"><Icon name={k.icon} size={16} /></div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Emergency contacts */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Emergency Helplines</div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Service</th><th>Number</th><th>Availability</th><th>Action</th></tr>
            </thead>
            <tbody>
              {emergencyContacts.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>{c.number}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{c.available}</td>
                  <td><a href={`tel:${c.number}`}><button className="btn btn-secondary btn-sm"><Icon name="phone" size={12} /> Call</button></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nearby hospitals */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Nearby Hospitals</div>
          <div className="card-subtitle">Emergency facilities</div>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Hospital</th><th>Address</th><th>Distance</th><th>ER Wait</th><th>ER Load</th></tr>
            </thead>
            <tbody>
              {nearbyHospitals.map((h, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{h.name}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{h.address}</td>
                  <td className="mono">{h.distance}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: h.erLoad > 70 ? 'var(--red)' : 'var(--green)' }}>{h.erWait}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-track" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${h.erLoad}%`, background: h.erLoad > 70 ? 'var(--red)' : 'var(--green)' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: h.erLoad > 70 ? 'var(--red)' : 'var(--green)' }}>{h.erLoad}%</span>
                    </div>
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
