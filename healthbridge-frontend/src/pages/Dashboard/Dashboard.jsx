import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role') || 'ROLE_ADMIN';
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('ALL');
  
  // Track active sub-view panel seamlessly
  const [currentTab, setCurrentTab] = useState('dashboard');

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Sandeep Reddy", hospital: "Apollo Hospitals", specialization: "Cardiology", availability: "10:00 AM - 01:00 PM", queue: 4, bookingStatus: "READY" },
    { id: 2, name: "Dr. Priya Sharma", hospital: "Fortis Healthcare", specialization: "Pediatrics", availability: "02:30 PM - 05:30 PM", queue: 0, bookingStatus: "READY" },
    { id: 3, name: "Dr. K. Obul Reddy", hospital: "KIMS Medical Centre", specialization: "Neurology", availability: "09:00 AM - 12:00 PM", queue: 7, bookingStatus: "READY" },
    { id: 4, name: "Dr. Anjali Desai", hospital: "Manipal Hospitals", specialization: "Dermatology", availability: "04:00 PM - 07:00 PM", queue: 2, bookingStatus: "READY" }
  ]);

  const handleGlobalLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const executeTokenAllocation = (id) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, bookingStatus: "PENDING" } : d));
    setTimeout(() => {
      setDoctors(prev => prev.map(d => d.id === id ? { ...d, bookingStatus: "BOOKED", queue: d.queue + 1 } : d));
    }, 1400);
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === 'ALL' || doc.specialization.toUpperCase() === specializationFilter.toUpperCase();
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="dashboard-root-layout">
      {/* Sidebar Panel Navigation */}
      <aside className="workspace-sidebar">
        <div className="sidebar-branding">
          <div className="brand-dot-indicator" />
          <h3>HealthBridge</h3>
        </div>
        <nav className="sidebar-nav-menu">
          <button onClick={() => setCurrentTab('dashboard')} className={`nav-item-btn ${currentTab === 'dashboard' ? 'active' : ''}`}><span className="icon-stub">📊</span>Dashboard Matrix</button>
          <button onClick={() => setCurrentTab('doctors')} className={`nav-item-btn ${currentTab === 'doctors' ? 'active' : ''}`}><span className="icon-stub">🩺</span>Doctor Registry</button>
          <button onClick={() => setCurrentTab('patients')} className={`nav-item-btn ${currentTab === 'patients' ? 'active' : ''}`}><span className="icon-stub">👤</span>Patient Database</button>
          <button onClick={() => setCurrentTab('appointments')} className={`nav-item-btn ${currentTab === 'appointments' ? 'active' : ''}`}><span className="icon-stub">📅</span>Appointments</button>
          <button onClick={() => setCurrentTab('queue')} className={`nav-item-btn ${currentTab === 'queue' ? 'active' : ''}`}><span className="icon-stub">⏳</span>Queue Live Status</button>
          <button onClick={() => setCurrentTab('analytics')} className={`nav-item-btn ${currentTab === 'analytics' ? 'active' : ''}`}><span className="icon-stub">📈</span>Analytical Analytics</button>
          <div className="nav-menu-divider" />
          <button onClick={() => setCurrentTab('settings')} className={`nav-item-btn ${currentTab === 'settings' ? 'active' : ''}`}><span className="icon-stub">⚙️</span>System Settings</button>
        </nav>
      </aside>

      {/* Main Structural Layout Content Viewport */}
      <main className="workspace-viewport">
        <header className="viewport-navbar">
          <div className="navbar-context-title">
            <h2>Clinical Workspace Matrix</h2>
            <span>System Clearance Tier: <strong>{userRole}</strong></span>
          </div>
          <div className="navbar-action-cluster">
            <div className="notification-bell-wrapper"><span className="bell-icon">🔔</span><span className="badge-alert-dot" /></div>
            <div className="profile-capsule">
              <div className="avatar-placeholder-circle">KO</div>
              <span>K. Obul Reddy</span>
            </div>
            <button className="logout-action-trigger" onClick={handleGlobalLogout}>Logout Session</button>
          </div>
        </header>

        <section className="viewport-scrollable-body">
          {/* CONDITIONALLY RENDER CONTENT BASED ON ACTIVE SIDEBAR SELECTION */}
          {currentTab === 'dashboard' && (
            <>
              <div className="metric-cards-grid-row">
                <div className="gradient-metric-card color-blue-gradient">
                  <div className="metric-meta"><span>Active Medical Staff</span><h2>1,240</h2></div>
                  <span className="metric-icon-overlay">🩺</span>
                </div>
                <div className="gradient-metric-card color-sky-gradient">
                  <div className="metric-meta"><span>Registered Patients</span><h2>45,210</h2></div>
                  <span className="metric-icon-overlay">👤</span>
                </div>
                <div className="gradient-metric-card color-green-gradient">
                  <div className="metric-meta"><span>Allocated Tokens Today</span><h2>684</h2></div>
                  <span className="metric-icon-overlay">📅</span>
                </div>
                <div className="gradient-metric-card color-amber-gradient">
                  <div className="metric-meta"><span>Live Active Queues</span><h2>18</h2></div>
                  <span className="metric-icon-overlay">⏳</span>
                </div>
              </div>

              <div className="data-grid-container-card">
                <div className="data-grid-header-actions-row">
                  <h3>Live Operational Doctor Matrix</h3>
                  <div className="filter-controls-cluster">
                    <input type="text" className="search-input-field" placeholder="Filter name or location criteria..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <select className="dropdown-select-field" value={specializationFilter} onChange={(e) => setSpecializationFilter(e.target.value)}>
                      <option value="ALL">All Specializations</option>
                      <option value="CARDIOLOGY">Cardiology</option>
                      <option value="NEUROLOGY">Neurology</option>
                      <option value="PEDIATRICS">Pediatrics</option>
                      <option value="DERMATOLOGY">Dermatology</option>
                    </select>
                  </div>
                </div>

                <div className="doctors-elastic-flex-grid">
                  {filteredDoctors.map((doc) => (
                    <div key={doc.id} className="doctor-profile-card">
                      <div className="card-top-decorator-bar" />
                      <div className="card-identity-block">
                        <div className="doctor-avatar-circle">{doc.name.split(' ')[1].charAt(0)}</div>
                        <div><h4>{doc.name}</h4><span>{doc.hospital}</span></div>
                      </div>
                      <div className="specialization-badge-row"><span className="badge-pill">{doc.specialization}</span></div>
                      <div className="metadata-parameters-stack">
                        <div className="meta-param-item"><span className="label">Operating Hours:</span><span className="value">{doc.availability}</span></div>
                        <div className="meta-param-item">
                          <span className="label">Live Token Queue Load:</span>
                          <span className="value highlight-text">{doc.queue === 0 ? "Immediate Clearance" : `${doc.queue} Cases Delayed Ahead`}</span>
                        </div>
                      </div>
                      <div className="card-action-footer">
                        {doc.bookingStatus === 'READY' && <button className="book-token-btn" onClick={() => executeTokenAllocation(doc.id)}>Allocate Visit Token</button>}
                        {doc.bookingStatus === 'PENDING' && <button className="book-token-btn processing" disabled><span className="spinner-orbit" /> Processing Allocation...</button>}
                        {doc.bookingStatus === 'BOOKED' && <div className="status-badge-success-confirmed">Token Issued Successfully ✅</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {currentTab === 'doctors' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>🩺 Doctor Registry Directory</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Advanced registry filters and clinician tracking infrastructure live monitoring module.</p>
            </div>
          )}

          {currentTab === 'patients' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>👤 Patient Database Records</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Secure EMR storage ledger tracking health history files, diagnosis codes, and intake forms.</p>
            </div>
          )}

          {currentTab === 'appointments' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>📅 Scheduled Consultations Log</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Calendar tracking core mappings for upcoming clinical appointments and cancellation rates.</p>
            </div>
          )}

          {currentTab === 'queue' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>⏳ Token Queue Live Pipeline</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Active real-time priority queues streaming tracking token statuses for waiting-room dashboard monitors.</p>
            </div>
          )}

          {currentTab === 'analytics' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>📈 Analytical Performance Insights</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>System health analytics reporting charts monitoring processing metrics across active facility blocks.</p>
            </div>
          )}

          {currentTab === 'settings' && (
            <div className="data-grid-container-card placeholder-fade">
              <h3>⚙️ System Workstation Configuration</h3>
              <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>Manage gateway rules, user permissions layout schemas, and local profile clearance tiers.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;