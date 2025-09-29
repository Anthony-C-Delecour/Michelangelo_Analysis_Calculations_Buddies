import { useState } from "react";

// Icon components for the sidebar
const DashboardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ManageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const SignOutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// Redesigned ClearIcon for better visibility
const ClearIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    style={{ cursor: 'pointer', marginLeft: '10px', flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="10" fill="#cccccc"></circle>
    <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"></path>
  </svg>
);

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    macbId: "mach.67f7add7e3ff5c9eba647993",
    email: "mich.macb@gmail.com",
    username: "mich.financial.analyst_cowbunga",
    fullName: "Michelangelo Splinterson",
    nickname: "Mikey",
    phone: "+1 (666) 442-8237",
    facebook: "mikey.splinterson.financial.analyst",
    instagram: "Mikey_TheNinja_Financer",
    linkedin: "mikey-splinterson-turtl3m8o",
    notifs: "On",
    bio: "God, I love being a turtle: fun-loving by nature, analytical by trade!",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hoverState, setHoverState] = useState({
    dashboard: false,
    manage: false,
    signOut: false,
    editButton: false,
    chatIcon: false,
    topDashboard: false,
    topManage: false,
  });

  const handleMouseEnter = (key) => setHoverState(prev => ({ ...prev, [key]: true }));
  const handleMouseLeave = (key) => setHoverState(prev => ({ ...prev, [key]: false }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleClearField = (fieldName) => {
    setProfile(prevProfile => ({ ...prevProfile, [fieldName]: '' }));
  };
  
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleEditSave = () => {
    if (isEditing) {
      alert("Profile saved!");
    }
    setIsEditing(!isEditing);
  };

  const profileFields = [
    { label: "M.A.C.B ID", key: "macbId", editable: false },
    { label: "Email", key: "email", editable: true },
    { label: "Username", key: "username", editable: true },
    { label: "Full name", key: "fullName", editable: true },
    { label: "Nickname", key: "nickname", editable: true },
    { label: "Phone No.", key: "phone", editable: true },
    { label: "Facebook", key: "facebook", editable: true },
    { label: "Instagram", key: "instagram", editable: true },
    { label: "LinkedIn", key: "linkedin", editable: true },
    { label: "Notifs.", key: "notifs", editable: true, type: "select" },
  ];

  const sidebarLinkStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "15px",
    color: "#555",
    padding: "10px",
    borderRadius: "6px",
    transition: "background-color 0.2s ease-in-out",
  };
  
  const sidebarLinkHoverStyle = {
    backgroundColor: "#f5f5f5",
  };

  const buttonStyle = {
    marginTop: "30px",
    background: "#1e2b22",
    color: "#fff",
    fontSize: "14px",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-start",
    transition: "opacity 0.2s ease-in-out",
  };
  
  const buttonHoverStyle = {
    opacity: 0.8,
  };

  const inputStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "8px",
    flex: 1,
    fontSize: "14px",
    width: '100%',
  };

  const chatIconStyle = {
    width: "80px",
    height: "80px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  };

  const chatIconHoverStyle = {
    transform: 'scale(1.1)',
  };

  const topNavLinkStyle = {
    color: "#fff",
    marginRight: "25px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "text-shadow 0.2s ease-in-out",
    color: "#fff",
  };

  const topNavLinkHoverStyle = {
    textShadow: "0 0 8px #3A6A3B",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f8f9fa", color: "#333", minHeight: "100vh" }}>
      
      {/* Top green navigation bar with MACB logo and Dashboard/Manage links */}
      <div
        style={{
          backgroundColor: "#3A6A3B",
          color: "#fff",
          padding: "25px 30px",
          fontSize: "18px",
          fontWeight: "600",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img 
          src="/images/MACB_logo.png" 
          alt="MACB Logo" 
          style={{ height: "40px", marginRight: "25px" }} 
        />
        <div
          style={hoverState.topDashboard ? {...topNavLinkStyle, ...topNavLinkHoverStyle} : topNavLinkStyle}
          onClick={() => navigateTo('/dashboard_page')}
          onMouseEnter={() => handleMouseEnter('topDashboard')}
          onMouseLeave={() => handleMouseLeave('topDashboard')}
        >
          Dashboard
        </div>
        <div
          style={hoverState.topManage ? {...topNavLinkStyle, ...topNavLinkHoverStyle} : topNavLinkStyle}
          onClick={() => navigateTo('/insert_extract_page')}
          onMouseEnter={() => handleMouseEnter('topManage')}
          onMouseLeave={() => handleMouseLeave('topManage')}
        >
          Manage
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "30px 20px",
            borderRight: "1px solid #e0e0e0",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src="/images/MACB_Profile.png"
              alt="Profile"
              style={{
                width: "90px",
                height: "70px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <div style={{ fontWeight: "600" }}>{profile.fullName.split(" ")[0]}</div>
            <div style={{ color: "#888", fontSize: "14px" }}>{profile.email}</div>
          </div>

          <div 
            style={hoverState.dashboard ? {...sidebarLinkStyle, ...sidebarLinkHoverStyle} : sidebarLinkStyle}
            onClick={() => navigateTo('/dashboard_page')}
            onMouseEnter={() => handleMouseEnter('dashboard')}
            onMouseLeave={() => handleMouseLeave('dashboard')}
          >
            <DashboardIcon />
            Dashboard
          </div>
          <div 
            style={hoverState.manage ? {...sidebarLinkStyle, ...sidebarLinkHoverStyle} : sidebarLinkStyle}
            onClick={() => navigateTo('/insert_extract_page')}
            onMouseEnter={() => handleMouseEnter('manage')}
            onMouseLeave={() => handleMouseLeave('manage')}
          >
            <ManageIcon />
            Manage
          </div>
          <div 
            style={hoverState.signOut ? {...sidebarLinkStyle, ...sidebarLinkHoverStyle} : sidebarLinkStyle}
            onClick={() => navigateTo('/login_page')}
            onMouseEnter={() => handleMouseEnter('signOut')}
            onMouseLeave={() => handleMouseLeave('signOut')}
          >
            <SignOutIcon />
            Sign out
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px" }}>
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "8px",
              maxWidth: "800px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* M.A.C.B. Header */}
            <div style={{
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
            }}>
              <img src="/images/MACB_logo.png" alt="Logo" style={{ height: '70px', marginRight: '15px' }} />
              <h1 style={{ margin: 0, fontSize: '29px' }}>M.A.C.B.</h1>
            </div>

            {/* Info fields */}
            {profileFields.map((field) => (
              <div
                key={field.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: "1px solid #f0f0f0",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "600", color: "#333", minWidth: "120px" }}>
                  {field.label}
                </span>
                {isEditing && field.editable ? (
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginLeft: '10px' }}>
                    {field.type === "select" ? (
                      <select
                        name="notifs"
                        value={profile.notifs}
                        onChange={handleChange}
                        style={inputStyle}
                      >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                      </select>
                    ) : (
                      <>
                        <input
                          type="text"
                          name={field.key}
                          value={profile[field.key]}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <ClearIcon onClick={() => handleClearField(field.key)} />
                      </>
                    )}
                  </div>
                ) : (
                  <span style={{ color: "#666", textAlign: "left", flex: 1, marginLeft: '10px' }}>
                    {profile[field.key]}
                  </span>
                )}
              </div>
            ))}

            {/* Bio section */}
            <div style={{ marginTop: "30px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "10px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Describe Yourself:
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: "80px",
                    padding: "10px",
                    border: isEditing ? "1px solid #ddd" : "1px solid #eee",
                    borderRadius: "6px",
                    fontSize: "14px",
                    resize: "vertical",
                    color: "#555",
                    backgroundColor: isEditing ? "#fff" : "#fcfcfc",
                  }}
                />
                {isEditing && <ClearIcon onClick={() => handleClearField('bio')} />}
              </div>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={handleEditSave}
              style={hoverState.editButton ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
              onMouseEnter={() => handleMouseEnter('editButton')}
              onMouseLeave={() => handleMouseLeave('editButton')}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "30px",
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              width: "100%",
              maxWidth: "800px",
              margin: "20px auto 0",
            }}
          >
            © 2025 M.A.C.B., Inc. All Rights Reserved.
          </div>
        </div>

        {/* Chat Icon */}
        <img
          src="/images/AI_Helper.png"
          alt="Chat"
          style={hoverState.chatIcon ? {...chatIconStyle, ...chatIconHoverStyle} : chatIconStyle}
          onMouseEnter={() => handleMouseEnter('chatIcon')}
          onMouseLeave={() => handleMouseLeave('chatIcon')}
        />
      </div>
    </div>
  );
}