// MedCare HMS — Mock Data (Indian Hospital Context)

export const staffList = [
  { id: 'DOC-042', name: 'Dr. Rajesh Sharma',     role: 'Doctor', department: 'Cardiology',      specialization: 'Interventional Cardiologist', shift: 'Morning',  status: 'active',  patients: 8, avatar: 'RS', color: 'blue' },
  { id: 'DOC-031', name: 'Dr. Priya Iyer',         role: 'Doctor', department: 'Neurology',       specialization: 'Neurologist',                 shift: 'Morning',  status: 'active',  patients: 6, avatar: 'PI', color: 'blue' },
  { id: 'DOC-019', name: 'Dr. Vikram Nair',        role: 'Doctor', department: 'Orthopedics',     specialization: 'Orthopedic Surgeon',          shift: 'Evening',  status: 'active',  patients: 5, avatar: 'VN', color: 'blue' },
  { id: 'DOC-055', name: 'Dr. Sunita Verma',       role: 'Doctor', department: 'General Medicine',specialization: 'General Physician',           shift: 'Morning',  status: 'on-call', patients: 10,avatar: 'SV', color: 'blue' },
  { id: 'DOC-067', name: 'Dr. Arun Krishnamurthy', role: 'Doctor', department: 'Dermatology',     specialization: 'Dermatologist',               shift: 'Morning',  status: 'active',  patients: 7, avatar: 'AK', color: 'blue' },
  { id: 'NUR-008', name: 'Kavitha Reddy',          role: 'Nurse',  department: 'ICU',             specialization: 'Critical Care',              shift: 'Night',    status: 'active',  patients: 4, avatar: 'KR', color: 'green' },
  { id: 'NUR-017', name: 'Rajan Pillai',           role: 'Nurse',  department: 'General',         specialization: 'General Care',               shift: 'Evening',  status: 'active',  patients: 6, avatar: 'RP', color: 'green' },
  { id: 'ADM-003', name: 'Meena Joshi',            role: 'Admin',  department: 'Reception',       specialization: 'Patient Coordination',       shift: 'Morning',  status: 'active',  patients: 0, avatar: 'MJ', color: 'amber' },
];

export const departments = [
  { id: 'cardio',    name: 'Cardiology',      doctors: ['Dr. Rajesh Sharma',     'Dr. Anand Menon'] },
  { id: 'neuro',     name: 'Neurology',       doctors: ['Dr. Priya Iyer',         'Dr. Suresh Babu'] },
  { id: 'ortho',     name: 'Orthopedics',     doctors: ['Dr. Vikram Nair',        'Dr. Deepak Pandey'] },
  { id: 'general',   name: 'General Medicine',doctors: ['Dr. Sunita Verma',       'Dr. Mohan Das'] },
  { id: 'derma',     name: 'Dermatology',     doctors: ['Dr. Arun Krishnamurthy', 'Dr. Rekha Mishra'] },
  { id: 'paeds',     name: 'Paediatrics',     doctors: ['Dr. Lakshmi Nair',       'Dr. Ramesh Gupta'] },
  { id: 'ophthal',   name: 'Ophthalmology',   doctors: ['Dr. Girish Kamath'] },
  { id: 'radiology', name: 'Radiology',       doctors: ['Dr. Nalini Rao',         'Dr. Sanjay Tiwari'] },
];

export const timeSlots = [
  { time: '09:00', available: true  },
  { time: '09:30', available: false },
  { time: '10:00', available: true  },
  { time: '10:30', available: true  },
  { time: '11:00', available: false },
  { time: '11:30', available: true  },
  { time: '12:00', available: false },
  { time: '14:00', available: true  },
  { time: '14:30', available: true  },
  { time: '15:00', available: false },
  { time: '15:30', available: true  },
  { time: '16:00', available: true  },
  { time: '16:30', available: false },
  { time: '17:00', available: true  },
];

export const patientAppointments = [
  { id: 'APT-2501', date: '2025-03-05', time: '10:00', doctor: 'Dr. Rajesh Sharma',     department: 'Cardiology',      type: 'Follow-up',        status: 'confirmed', location: 'OPD Room 204' },
  { id: 'APT-2502', date: '2025-03-12', time: '14:30', doctor: 'Dr. Priya Iyer',         department: 'Neurology',       type: 'Consultation',     status: 'pending',   location: 'OPD Room 310' },
  { id: 'APT-2503', date: '2025-01-15', time: '09:00', doctor: 'Dr. Vikram Nair',        department: 'Orthopedics',     type: 'Post-op Review',   status: 'completed', location: 'OPD Room 105' },
  { id: 'APT-2504', date: '2025-01-22', time: '11:30', doctor: 'Dr. Sunita Verma',       department: 'General Medicine','type':'Routine Checkup', status: 'completed', location: 'OPD Room 101' },
  { id: 'APT-2505', date: '2025-03-18', time: '16:00', doctor: 'Dr. Arun Krishnamurthy','department': 'Dermatology',   type: 'New Consultation', status: 'confirmed', location: 'OPD Room 402' },
];

export const testResults = [
  {
    id: 'LAB-3301',
    name: 'Complete Blood Count (CBC)',
    type: 'Haematology',
    date: '2025-02-10',
    orderedBy: 'Dr. Sunita Verma',
    status: 'normal',
    values: [
      { parameter: 'Haemoglobin',   value: '13.8 g/dL',   range: '12.0–16.0',        status: 'normal' },
      { parameter: 'WBC Count',     value: '7200 /µL',    range: '4500–11000',        status: 'normal' },
      { parameter: 'Platelet Count',value: '2.45 L/µL',   range: '1.5–4.0 L',         status: 'normal' },
      { parameter: 'RBC Count',     value: '4.8 M/µL',    range: '4.2–5.4',           status: 'normal' },
    ],
  },
  {
    id: 'LAB-3302',
    name: 'Lipid Profile',
    type: 'Biochemistry',
    date: '2025-02-10',
    orderedBy: 'Dr. Rajesh Sharma',
    status: 'attention',
    values: [
      { parameter: 'Total Cholesterol',value: '218 mg/dL', range: '<200',  status: 'attention' },
      { parameter: 'LDL',              value: '142 mg/dL', range: '<130',  status: 'attention' },
      { parameter: 'HDL',              value: '52 mg/dL',  range: '>40',   status: 'normal' },
      { parameter: 'Triglycerides',    value: '160 mg/dL', range: '<150',  status: 'attention' },
    ],
  },
  {
    id: 'RAD-1101',
    name: 'Chest X-Ray (PA View)',
    type: 'Radiology',
    date: '2025-01-28',
    orderedBy: 'Dr. Rajesh Sharma',
    status: 'normal',
    values: [],
    reportSummary: 'No significant cardiopulmonary abnormality. Lung fields are clear bilaterally. Cardiac silhouette is normal in size and configuration. No pleural effusion or pneumothorax seen.',
  },
  {
    id: 'CAR-0501',
    name: 'ECG — 12 Lead',
    type: 'Cardiology',
    date: '2025-01-28',
    orderedBy: 'Dr. Rajesh Sharma',
    status: 'normal',
    values: [],
    reportSummary: 'Normal sinus rhythm at 72 bpm. PR interval 160ms. QRS duration 90ms. No ST segment changes or arrhythmias detected.',
  },
  {
    id: 'LAB-3305',
    name: 'Blood Glucose — HbA1c',
    type: 'Biochemistry',
    date: '2025-02-10',
    orderedBy: 'Dr. Sunita Verma',
    status: 'critical',
    values: [
      { parameter: 'HbA1c',          value: '8.2%',      range: '<5.7%',   status: 'critical' },
      { parameter: 'Fasting Glucose',value: '156 mg/dL', range: '70–100',  status: 'critical' },
      { parameter: 'PP Glucose',     value: '212 mg/dL', range: '<140',    status: 'critical' },
    ],
  },
  {
    id: 'RAD-1102',
    name: 'CT Scan — Abdomen & Pelvis',
    type: 'Radiology',
    date: '2024-12-15',
    orderedBy: 'Dr. Priya Iyer',
    status: 'normal',
    values: [],
    reportSummary: 'CT abdomen shows no acute intra-abdominal pathology. Liver, spleen, both kidneys and pancreas are normal in size and morphology. No lymphadenopathy detected.',
  },
];

export const prescriptions = [
  {
    id: 'RX-7701',
    medication: 'Atorvastatin',
    brandName: 'Storvas 20',
    dosage: '20 mg',
    frequency: 'Once daily at bedtime',
    duration: '3 months',
    startDate: '2025-02-10',
    endDate: '2025-05-10',
    doctor: 'Dr. Rajesh Sharma',
    department: 'Cardiology',
    status: 'active',
    instructions: 'Take at night. Avoid grapefruit. Report any unexplained muscle pain immediately.',
    refills: 2,
  },
  {
    id: 'RX-7702',
    medication: 'Metformin Hydrochloride',
    brandName: 'Glycomet 500',
    dosage: '500 mg',
    frequency: 'Twice daily with meals',
    duration: '6 months',
    startDate: '2025-02-10',
    endDate: '2025-08-10',
    doctor: 'Dr. Sunita Verma',
    department: 'General Medicine',
    status: 'active',
    instructions: 'Take strictly with food. Monitor blood glucose at home twice weekly.',
    refills: 5,
  },
  {
    id: 'RX-7703',
    medication: 'Amlodipine Besylate',
    brandName: 'Amlip 5',
    dosage: '5 mg',
    frequency: 'Once daily',
    duration: '3 months',
    startDate: '2025-02-10',
    endDate: '2025-05-10',
    doctor: 'Dr. Rajesh Sharma',
    department: 'Cardiology',
    status: 'active',
    instructions: 'Monitor BP regularly. Do not discontinue abruptly.',
    refills: 2,
  },
  {
    id: 'RX-7704',
    medication: 'Ibuprofen',
    brandName: 'Brufen 400',
    dosage: '400 mg',
    frequency: 'Three times daily as needed',
    duration: '2 weeks',
    startDate: '2025-01-15',
    endDate: '2025-01-29',
    doctor: 'Dr. Vikram Nair',
    department: 'Orthopedics',
    status: 'completed',
    instructions: 'Take after meals. Do not exceed 3 doses/day. Stop if gastric discomfort occurs.',
    refills: 0,
  },
];

export const emergencyContacts = [
  { name: 'National Emergency Number',     number: '112',         type: 'national',  available: '24/7' },
  { name: 'Ambulance Services (MEMS)',      number: '108',         type: 'ambulance', available: '24/7' },
  { name: 'MedCare Hospital ER — Direct',  number: '011-4600-0000',type: 'hospital', available: '24/7' },
  { name: 'Poison Control — AIIMS Delhi',  number: '011-2659-3677',type: 'poison',   available: '24/7' },
  { name: 'COVID / Health Helpline',       number: '1800-112-545', type: 'helpline',  available: '24/7' },
  { name: 'MedCare Patient Services',      number: '1800-102-0213',type: 'patient',  available: 'Mon–Sat 8am–8pm' },
];

export const nearbyHospitals = [
  { name: 'MedCare Central Hospital',    address: 'Sector 14, Rohini, Delhi',         distance: '0.3 km',  erWait: '12 min', erLoad: 42 },
  { name: 'AIIMS Trauma Centre',         address: 'Ansari Nagar, New Delhi 110029',   distance: '4.2 km',  erWait: '38 min', erLoad: 81 },
  { name: 'Safdarjung Hospital',         address: 'Ansari Nagar West, New Delhi',     distance: '5.8 km',  erWait: '22 min', erLoad: 58 },
];

export const staffSchedule = {
  weeklyShifts: [
    { day: 'Monday',    shift: 'Morning 07:00–15:00', department: 'Cardiology', ward: 'Ward 2B', patients: 8, status: 'completed' },
    { day: 'Tuesday',   shift: 'Morning 07:00–15:00', department: 'Cardiology', ward: 'Ward 2B', patients: 6, status: 'completed' },
    { day: 'Wednesday', shift: 'Morning 07:00–15:00', department: 'Cardiology', ward: 'Ward 2B', patients: 7, status: 'today' },
    { day: 'Thursday',  shift: 'Morning 07:00–15:00', department: 'Cardiology', ward: 'Ward 2B', patients: 8, status: 'upcoming' },
    { day: 'Friday',    shift: 'On-Call 15:00–23:00', department: 'Emergency',  ward: 'ER Bay',  patients: 0, status: 'upcoming' },
    { day: 'Saturday',  shift: 'Off',                 department: '—',          ward: '—',       patients: 0, status: 'off' },
    { day: 'Sunday',    shift: 'Off',                 department: '—',          ward: '—',       patients: 0, status: 'off' },
  ],
};

export const assignedPatients = [
  { id: 'PAT-20890', name: 'Ananya Krishnan',  age: 34, sex: 'F', room: '204-A', ward: 'General', admissionDate: '2025-02-08', diagnosis: 'Hypertension + Dyslipidaemia', condition: 'stable',   treatmentProgress: 60, notes: 'BP stabilising at 130/85 on Amlodipine. Lipid panel repeat due on 5 Mar.' },
  { id: 'PAT-18234', name: 'Suresh Babu',      age: 67, sex: 'M', room: 'ICU-03',ward: 'ICU',     admissionDate: '2025-02-20', diagnosis: 'Acute Myocardial Infarction',   condition: 'critical', treatmentProgress: 30, notes: 'Post-PTCA Day 3. Troponin trending down. Continuous monitoring.' },
  { id: 'PAT-30011', name: 'Radha Menon',      age: 52, sex: 'F', room: '208-B', ward: 'General', admissionDate: '2025-02-18', diagnosis: 'Heart Failure (EF 35%)',        condition: 'fair',     treatmentProgress: 50, notes: 'Diuresis improving. Echo scheduled Friday. Fluid balance charted daily.' },
  { id: 'PAT-41122', name: 'Dinesh Agarwal',   age: 45, sex: 'M', room: '201-C', ward: 'General', admissionDate: '2025-02-22', diagnosis: 'Atrial Fibrillation',           condition: 'stable',   treatmentProgress: 70, notes: 'Rate controlled. Anticoagulation started. Cardioversion planned next week.' },
  { id: 'PAT-55789', name: 'Kamala Devi',      age: 78, sex: 'F', room: 'ICU-05',ward: 'ICU',     admissionDate: '2025-02-19', diagnosis: 'Cardiogenic Shock',             condition: 'critical', treatmentProgress: 20, notes: 'On vasopressors. IABP support. Intensivist co-managing. Family counselled.' },
];

export const staffAlerts = [
  { id: 'ALR-001', type: 'critical', title: 'Code Blue — ICU-05',     message: 'Immediate response required. Patient: Kamala Devi (PAT-55789). Cardiogenic Shock.', time: '3 min ago',  acknowledged: false },
  { id: 'ALR-002', type: 'warning',  title: 'ICU Capacity at 80%',    message: 'ICU now at 80% capacity. Please review discharge eligibility for stable patients.',  time: '18 min ago', acknowledged: false },
  { id: 'ALR-003', type: 'warning',  title: 'Lab Result Ready',        message: 'Troponin result for PAT-18234 (Suresh Babu) is ready for review.',                   time: '32 min ago', acknowledged: true },
  { id: 'ALR-004', type: 'info',     title: 'Equipment Maintenance',   message: 'Infusion Pump EQ-005 overdue for maintenance. Arrange replacement from store.',     time: '2 hrs ago',  acknowledged: true },
];

export const adminKPIs = {
  totalBeds: 320, occupiedBeds: 247, availableBeds: 73,
  icuBeds: 40, icuOccupied: 32,
  totalPatients: 247, totalStaff: 148, activeStaff: 127,
  erWaitTime: 28, erPatients: 18,
  surgeriesToday: 12, admissionsToday: 8, dischargeToday: 11,
};

export const bedData = [
  { ward: 'ICU',             total: 40, occupied: 32, load: 80 },
  { ward: 'General Medicine',total: 80, occupied: 61, load: 76 },
  { ward: 'Cardiology',      total: 40, occupied: 34, load: 85 },
  { ward: 'Orthopaedics',    total: 30, occupied: 22, load: 73 },
  { ward: 'Neurology',       total: 30, occupied: 25, load: 83 },
  { ward: 'Paediatrics',     total: 40, occupied: 28, load: 70 },
  { ward: 'Maternity',       total: 30, occupied: 21, load: 70 },
  { ward: 'Emergency',       total: 30, occupied: 24, load: 80 },
];

export const equipmentData = [
  { id: 'EQ-001', name: 'Ventilator — Drager Evita V800', category: 'ICU',      status: 'in-use',    location: 'ICU-03',        lastService: '2025-01-15', nextService: '2025-04-15' },
  { id: 'EQ-002', name: 'ECG Monitor 12-Lead (Philips)',  category: 'Cardiac',  status: 'available', location: 'Equipment Room', lastService: '2025-02-01', nextService: '2025-05-01' },
  { id: 'EQ-003', name: 'MRI Scanner 1.5T (Siemens)',     category: 'Radiology',status: 'in-use',    location: 'Radiology Suite',lastService: '2025-01-20', nextService: '2025-04-20' },
  { id: 'EQ-004', name: 'Defibrillator — Zoll AED',       category: 'Emergency',status: 'available', location: 'ER Bay 2',       lastService: '2025-02-10', nextService: '2025-05-10' },
  { id: 'EQ-005', name: 'Infusion Pump — Fresenius',      category: 'General',  status: 'maintenance',location: 'Workshop',      lastService: '2024-12-01', nextService: '2025-03-01' },
  { id: 'EQ-006', name: 'Ultrasound — GE Logiq E10',      category: 'Radiology',status: 'in-use',    location: 'OPD Suite 3',    lastService: '2025-01-10', nextService: '2025-04-10' },
  { id: 'EQ-007', name: 'Anaesthesia Machine (Drager)',   category: 'Surgery',  status: 'in-use',    location: 'OT-2',           lastService: '2025-02-15', nextService: '2025-05-15' },
  { id: 'EQ-008', name: 'Patient Monitor — Philips MP60', category: 'Monitoring',status:'available',  location: 'Ward 2B',        lastService: '2025-02-05', nextService: '2025-05-05' },
];

export const erData = {
  currentWaitTime: 28, erLoad: 80,
  totalBays: 30, occupiedBays: 24,
  criticalCases: 3, moderateCases: 12, minorCases: 9,
  staffOnDuty: 8,
  alerts: [
    { id: 'ERA-001', type: 'critical', message: 'RTA incoming — 3 casualties en route from Rohini Expressway',   time: '2 min ago' },
    { id: 'ERA-002', type: 'warning',  message: 'ICU capacity at 80% — activate transfer protocol if needed',  time: '15 min ago' },
    { id: 'ERA-003', type: 'info',     message: 'Blood bank: O-negative supply low — reorder initiated',       time: '1 hr ago' },
  ],
};
