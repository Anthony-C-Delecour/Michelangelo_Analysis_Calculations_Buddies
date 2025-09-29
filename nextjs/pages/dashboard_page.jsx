import React from "react";

// The URL for the turtle logo used in the design
const turtleLogo = "https://i.imgur.com/vLq5hJd.png"; 

// --- SVG Icon Components ---
// I've created these to match the style of your ProfilePage icons

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
  return (
    <div style={styles.dashboardNew}>
      {/* Header */}
      <header style={styles.dashboardHeader}>
        <div style={styles.logoContainer}>
            <img src={turtleLogo} alt="Logo" style={styles.logo} />
        </div>
        <nav>
          <span style={styles.navItem}>Dashboard</span>
          <span style={styles.navItem}>Manage</span>
        </nav>
        <div style={styles.logoContainer}>
             <img src={turtleLogo} alt="Logo" style={styles.logo} />
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.dashboardMain}>
        <h1 style={styles.title}>Portfolio Dashboard</h1>

        {/* Filter bar */}
        <div style={styles.filterBar}>
          <select style={styles.filterSelect}><option>Day: -</option></select>
          <select style={styles.filterSelect}><option>Month: -</option></select>
          <select style={styles.filterSelect}><option>Year: -</option></select>
          <select style={styles.filterSelect}><option>Hour: -</option></select>
          <select style={styles.filterSelect}><option>Minute: -</option></select>
          <select style={styles.filterSelect}><option>Period: -</option></select>
          <select style={{...styles.filterSelect, flex: 1.5}}><option>Financial Choice: -</option></select>
          <select style={{...styles.filterSelect, flex: 1}}><option>Type: -</option></select>
          <input type="text" placeholder="Amount (Baht): -" style={{...styles.filterSelect, flex: 1}} />
          <select style={{...styles.filterSelect, flex: 1}}><option>Per (Unit): -</option></select>
          <button style={styles.iconBtn}>
            <FilterIcon color="white" />
          </button>
          <button style={styles.iconBtn}>
            <ClearIcon color="white" />
          </button>
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
                <span style={styles.actionIcon}><EditIcon /></span>
                <span style={styles.actionIcon}><TrashIcon /></span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom buttons */}
        <div style={styles.bottomButtons}>
          <button style={styles.mainBtn}>SUMMARY</button>
          <button style={styles.mainBtn}>ALLOCATION</button>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.dashboardFooter}>
        <span>© 2025 M.A.C.B., Inc. All Rights Reserved.</span>
        <img src={turtleLogo} alt="Footer Logo" style={styles.footerLogo} />
      </footer>
    </div>
  );
}

/* Inline Styles */
const styles = {
  dashboardNew: { fontFamily: "'Inter', sans-serif", background: "#f5f6f4", minHeight: "100vh", display: "flex", flexDirection: "column", position: 'relative' },
  dashboardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", background: "#2E4A30", color: "white" },
  logoContainer: { width: '40px', height: '40px' },
  logo: { width: '100%', height: '100%', objectFit: 'contain' },
  navItem: { margin: "0 15px", cursor: "pointer", fontSize: '15px' },
  dashboardMain: { padding: "30px 40px", flex: 1 },
  title: { textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "30px", color: '#333' },
  filterBar: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px", alignItems: 'center' },
  filterSelect: { 
    background: 'white', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    padding: '6px 10px', 
    fontSize: '13px', 
    color: '#555',
    minWidth: '70px',
    height: '32px',
    boxSizing: 'border-box'
  },
  iconBtn: { 
    background: "#3A3A3C", 
    color: "white", 
    border: "none", 
    borderRadius: "6px", 
    padding: "6px 10px", 
    cursor: "pointer",
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5px'
  },
  dashboardList: { display: "flex", flexDirection: "column", gap: "10px" },
  dashboardCard: { 
    display: "grid", 
    gridTemplateColumns: "130px 100px 2.5fr 1.2fr 1.2fr 1fr auto",
    gap: "12px", 
    background: "white", 
    padding: "15px", 
    borderRadius: "12px", 
    boxShadow: "0px 2px 6px rgba(0,0,0,0.08)", 
    alignItems: "center" 
  },
  dateBtn: { background: "#d9e0d8", border: "none", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", fontWeight: "500", color: '#333' },
  timeBtn: { background: "#d9e0d8", border: "none", borderRadius: "6px", padding: "8px 12px", fontSize: "13px", fontWeight: "500", color: '#333' },
  fieldGroup: { display: "flex", flexDirection: "column" },
  label: { fontSize: "12px", marginBottom: "3px", color: '#666' },
  input: { 
    width: "100%", 
    padding: "6px 8px", 
    borderRadius: "6px", 
    border: "1px solid #ccc", 
    color: '#333', 
    background: '#FFF',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  actionBtns: { display: "flex", gap: "15px", justifyContent: 'flex-start', paddingLeft: '10px' },
  actionIcon: { color: "#444", cursor: "pointer", display: 'flex', alignItems: 'center' },
  bottomButtons: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "25px" },
  mainBtn: { background: "#2E4A30", color: "white", border: "none", borderRadius: "8px", padding: "10px 25px", fontSize: "14px", cursor: "pointer", fontWeight: 'bold' },
  dashboardFooter: { textAlign: "center", padding: "20px", fontSize: "12px", color: "#555", position: 'relative' },
  footerLogo: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    right: '40px',
    bottom: '15px'
  }
};
