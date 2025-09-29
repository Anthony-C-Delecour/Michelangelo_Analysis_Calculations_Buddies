import React, { useState } from 'react';
import { useRouter } from 'next/router';

// Logos
const macbLogo = "/images/MACB_logo.png"; 
const profileLogo = "/images/MACB_Profile.png"; 
const chatIcon = "/images/AI_Helper.png"; 

// --- SVG Icon Components ---
const FilterIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const ClearIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const EditIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);



const dashboardData = [
  { date: "Jun 10, 2025", time: "9:41 AM", choice: "1-Bedroom Condo (Bangkok)", type: "Real Estate", amount: 2800000, unit: "Unit" },
  { date: "Jun 12, 2025", time: "8:43 AM", choice: "Brent Crude Oil", type: "Commodities", amount: 2700, unit: "Barrel" },
  { date: "Jun 14, 2025", time: "7:50 AM", choice: "AOT Stock", type: "Stocks", amount: 70, unit: "Share" },
  { date: "Jun 18, 2025", time: "9:55 AM", choice: "PTT Stock", type: "Stocks", amount: 42, unit: "Share" },
  { date: "Jun 20, 2025", time: "7:15 AM", choice: "24K Gold", type: "Commodities", amount: 2050, unit: "Gram" },
  { date: "Jun 22, 2025", time: "6:45 AM", choice: "3-Bedroom House (Chiang Mai)", type: "Real Estate", amount: 5200000, unit: "Unit" },
  { date: "Jun 25, 2025", time: "5:50 AM", choice: "3-Month Thai Government Bond", type: "Cash Equivalents", amount: 1050, unit: "Bond" },
];

const formatAmount = (num) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function DashboardNew() {
  const [hover, setHover] = useState({});
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.dashboardNew}>
      {/* Header */}
      <header style={styles.dashboardHeader}>
        <div style={styles.headerLeft}>
          <div
            style={{
              ...styles.logoContainer,
              ...(hover.macbLogo ? styles.logoHover : {}),
            }}
            onMouseEnter={() => setHover({ ...hover, macbLogo: true })}
            onMouseLeave={() => setHover({ ...hover, macbLogo: false })}
          >
            <img src={macbLogo} alt="MACB Logo" style={styles.logo} />
          </div>
          <nav>
            {["Dashboard", "Manage"].map((item, idx) => (
              <span
                key={idx}
                style={{
                  ...styles.navItem,
                  ...(hover[item] ? styles.navItemHover : {}),
                }}
                onMouseEnter={() => setHover({ ...hover, [item]: true })}
                onMouseLeave={() => setHover({ ...hover, [item]: false })}
                onClick={() => {
                  if (item === "Manage") handleNavigation("/insert_extract_page");
                }}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
        <div
          style={{
            ...styles.logoContainer,
            ...(hover.profileLogo ? styles.logoHover : {}),
          }}
          onMouseEnter={() => setHover({ ...hover, profileLogo: true })}
          onMouseLeave={() => setHover({ ...hover, profileLogo: false })}
          onClick={() => handleNavigation("/profile_page")}
        >
          <img src={profileLogo} alt="Profile Logo" style={styles.logo} />
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.dashboardMain}>
        <h1 style={styles.title}>Portfolio Dashboard</h1>

{/* Filter bar */}
<div style={styles.filterBar}>
  {/* Filters */}
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Day</label>
    <select style={styles.filterSelect}>
      {Array.from({ length: 31 }, (_, i) => (
        <option key={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Month</label>
    <select style={styles.filterSelect}>
      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
        <option key={m}>{m}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Year</label>
    <select style={styles.filterSelect}>
      {["2023","2024","2025"].map((y) => (
        <option key={y}>{y}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Hour</label>
    <select style={styles.filterSelect}>
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Minute</label>
    <select style={styles.filterSelect}>
      {Array.from({ length: 60 }, (_, i) => (
        <option key={i}>{i.toString().padStart(2, '0')}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Period</label>
    <select style={styles.filterSelect}>
      {["AM","PM"].map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Financial Choice</label>
    <select style={styles.filterSelect}>
      {dashboardData.map((item, i) => (
        <option key={i}>{item.choice}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Type</label>
    <select style={styles.filterSelect}>
      {["Real Estate","Commodities","Stocks","Cash Equivalents"].map((t) => (
        <option key={t}>{t}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Amount</label>
    <select style={styles.filterSelect}>
      {["< 1,000","1,000 - 10,000","10,000 - 1,000,000","> 1,000,000"].map((a) => (
        <option key={a}>{a}</option>
      ))}
    </select>
  </div>
  <div style={styles.filterGroup}>
    <label style={styles.filterLabel}>Per (Unit)</label>
    <select style={styles.filterSelect}>
      {["Unit","Share","Barrel","Gram","Bond"].map((u) => (
        <option key={u}>{u}</option>
      ))}
    </select>
  </div>

  {/* Filter / Clear buttons */}
  <div style={styles.filterButtons}>
    {["Filter", "Clear"].map((btn, idx) => (
      <button
        key={idx}
        style={{
          ...styles.iconBtn,
          ...(hover[btn] ? styles.iconBtnHover : {})
        }}
        onMouseEnter={() => setHover({ ...hover, [btn]: true })}
        onMouseLeave={() => setHover({ ...hover, [btn]: false })}
      >
        {btn === "Filter" ? <FilterIcon color="white" /> : <ClearIcon color="white" />}
      </button>
    ))}
  </div>
</div>

        {/* Portfolio List */}
        <div style={styles.dashboardList}>
          {dashboardData.map((item, idx) => (
            <div key={idx} style={styles.dashboardCard}>
              <button style={styles.dateBtn}>{item.date}</button>
              <button style={styles.timeBtn}>{item.time}</button>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Financial Choice:</label>
                <input type="text" value={item.choice} readOnly style={styles.input} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Type:</label>
                <select value={item.type} readOnly disabled style={styles.input}>
                  <option>{item.type}</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Amount (Baht):</label>
                <input type="text" value={formatAmount(item.amount)} readOnly style={styles.input} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Per (Unit):</label>
                <select value={item.unit} readOnly disabled style={styles.input}>
                  <option>{item.unit}</option>
                </select>
              </div>
              <div style={styles.actionBtns}>
                {["Edit", "Delete"].map((action, i) => (
                  <span
                    key={i}
                    style={{
                      ...styles.actionIcon,
                      ...(hover[`${action}-${idx}`] ? styles.actionIconHover : {})
                    }}
                    onMouseEnter={() => setHover({ ...hover, [`${action}-${idx}`]: true })}
                    onMouseLeave={() => setHover({ ...hover, [`${action}-${idx}`]: false })}
                  >
                    {action === "Edit" ? <EditIcon /> : <TrashIcon />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom buttons */}
        <div style={styles.bottomButtons}>
          {["SUMMARY", "ALLOCATION"].map((btn, idx) => (
            <button
              key={idx}
              style={{
                ...styles.mainBtn,
                ...(hover[btn] ? styles.mainBtnHover : {})
              }}
              onMouseEnter={() => setHover({ ...hover, [btn]: true })}
              onMouseLeave={() => setHover({ ...hover, [btn]: false })}
              onClick={() => {
                if (btn === "SUMMARY") handleNavigation("/summary_page");
                if (btn === "ALLOCATION") handleNavigation("/allocation_page");
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.dashboardFooter}>
        <span>© 2025 M.A.C.B., Inc. All Rights Reserved.</span>
      </footer>

      {/* Floating Chat Icon */}
      <img
        src={chatIcon}
        alt="Chat Icon"
        style={{
          ...styles.chatIcon,
          ...(hover.chat ? styles.chatIconHover : {})
        }}
        onMouseEnter={() => setHover({ ...hover, chat: true })}
        onMouseLeave={() => setHover({ ...hover, chat: false })}
      />
    </div>
  );
}

/* Inline Styles */
const styles = {
  dashboardNew: { fontFamily: "'Inter', sans-serif", background: "#f5f6f4", minHeight: "100vh", display: "flex", flexDirection: "column", position: 'relative' },
  dashboardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", background: "#3A6A3B", color: "white" },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  logoContainer: { width: '50px', height: '50px', transition: 'transform 0.2s ease', cursor: 'pointer' },
  logo: { width: '100%', height: '100%', objectFit: 'contain' },
  logoHover: { transform: 'scale(1.1)' },
  navItem: { margin: "0 15px", cursor: "pointer", fontSize: '15px', transition: 'transform 0.2s ease, color 0.2s ease' },
  navItemHover: { transform: 'scale(1.1)', color: '#d0ffd0' },
  dashboardMain: { padding: "30px 40px", flex: 1 },
  title: { textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: '#333' },
  filterBar: { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px", alignItems: 'flex-end', justifyContent: 'center' },
  filterGroup: { display: 'flex', flexDirection: 'column', minWidth: '70px' },
  filterLabel: { fontSize: '12px', color: '#555', marginBottom: '4px', fontWeight: '500' },
  filterSelect: { background: 'white', border: '1px solid #ccc', borderRadius: '4px', padding: '6px 10px', fontSize: '13px', color: '#555', width: '100%', height: '32px', boxSizing: 'border-box' },
  filterButtons: { display: 'flex', gap: '5px', paddingBottom: '1px' },
  iconBtn: { background: "#3A3A3C", color: "white", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' },
  iconBtnHover: { background: "#555" },
  dashboardList: { display: "flex", flexDirection: "column", gap: "10px" },
  dashboardCard: { display: "grid", gridTemplateColumns: "130px 100px 2.5fr 1.2fr 1.2fr 1fr auto", gap: "12px", background: "white", padding: "15px", borderRadius: "12px", boxShadow: "0px 2px 6px rgba(0,0,0,0.08)", alignItems: "end" },
  dateBtn: { background: "#d9e0d8", border: "none", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", fontWeight: "500", color: '#333' },
  timeBtn: { background: "#d9e0d8", border: "none", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", fontWeight: "500", color: '#333' },
  fieldGroup: { display: "flex", flexDirection: "column" },
  label: { fontSize: "12px", marginBottom: "3px", color: '#666' },
  input: { width: "100%", padding: "6px 8px", borderRadius: "6px", border: "1px solid #ccc", color: '#333', background: '#FFF', fontSize: '14px', boxSizing: 'border-box' },
  actionBtns: { display: "flex", gap: "15px", justifyContent: 'flex-start', paddingLeft: '10px', paddingBottom: '8px' },
  actionIcon: { color: "#444", cursor: "pointer", display: 'flex', alignItems: 'center', transition: 'background 0.2s ease, transform 0.2s ease', padding: '4px', borderRadius: '6px' },
  actionIconHover: { background: "#f0f0f0", transform: 'scale(1.05)' },
  bottomButtons: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "25px" },
  mainBtn: { background: "#3A6A3B", color: "white", border: "none", borderRadius: "8px", padding: "12px 40px", fontSize: "16px", cursor: "pointer", fontWeight: 'bold', transition: 'background 0.2s ease, transform 0.2s ease' },
  mainBtnHover: { background: "#2e4f2e", transform: 'scale(1.05)' },
  dashboardFooter: { textAlign: "center", padding: "20px", fontSize: "12px", color: "#555" },
  chatIcon: { width: '65px', height: '65px', position: 'fixed', right: '20px', bottom: '20px', cursor: 'pointer', borderRadius: '50%', boxShadow: '0px 2px 6px rgba(0,0,0,0.2)', transition: 'transform 0.2s ease' },
  chatIconHover: { transform: 'scale(1.1)' }
};
