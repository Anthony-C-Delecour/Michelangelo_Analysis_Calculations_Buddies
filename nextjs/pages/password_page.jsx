import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Navigation Bar Component
function NavigationLayout() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        backgroundColor: "#3A6A3B",
        color: "white",
      }}
    >
      <h1>M.A.C.B.</h1>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    minHeight: "calc(100vh - 80px)",
    width: "100%",
    backgroundColor: "#f8f9fa",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    background: "white",
  },
  illustration: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "80vh",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "2rem",
  },
  card: {
    background: "white",
    padding: "3rem 2.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "480px",
    textAlign: "center",
  },
  brandingHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  acronym: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#212529",
    margin: 0,
  },
  welcomeText: {
    color: "#6c757d",
    marginBottom: "2rem",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "1rem",
  },
  sendResetBtn: {
    backgroundColor: "#3A6A3B",
    color: "white",
    padding: "14px 0",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderRadius: "8px",
  },
  backSignInBtn: {
    borderColor: "#3A6A3B",
    color: "#3A6A3B",
    padding: "14px 0",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderRadius: "8px",
  },
  tooltipBox: {
    textAlign: "left",
    marginTop: "0.25rem",
    fontSize: "0.85rem",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    backgroundColor: "#f1f3f5",
  },
  footer: {
    marginTop: "2rem",
    color: "#adb5bd",
    fontSize: "0.8rem",
  },
};

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password reset successful!");
    console.log("Password reset:", formData.password);
  };

  const handleSignIn = () => {
    window.location.href = "/login_page";
  };

  return (
    <>
      <NavigationLayout />
      <div style={styles.pageContainer}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Welcome.png"
            alt="Team working on analytics"
            style={styles.illustration}
          />
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <div style={styles.brandingHeader}>
              <img
                src="/images/MACB_logo.png"
                alt="M.A.C.B. Logo"
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <h1 style={styles.acronym}>M.A.C.B.</h1>
            </div>

            <p style={styles.welcomeText}>Please reset your account password.</p>

            <form style={styles.form} onSubmit={handleSubmit}>
              {/* Password */}
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordHint(true)}
                onBlur={() => setShowPasswordHint(true)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formData.password && (
                        <IconButton onClick={() => clearField("password")}>
                          <ClearIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Hint */}
              {showPasswordHint && formData.password && (
                <div style={styles.tooltipBox}>
                  <p style={{ color: formData.password.length >= 8 ? "green" : "red" }}>
                    • At least 8 characters
                  </p>
                  <p style={{ color: /[A-Z]/.test(formData.password) ? "green" : "red" }}>
                    • At least 1 uppercase letter
                  </p>
                  <p style={{ color: /\d/.test(formData.password) ? "green" : "red" }}>
                    • At least 1 number
                  </p>
                  <p style={{ color: /[!@#$%^&*]/.test(formData.password) ? "green" : "red" }}>
                    • At least 1 special character (!@#$%^&*)
                  </p>
                </div>
              )}

              {/* Confirm Password */}
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formData.confirmPassword && (
                        <IconButton onClick={() => clearField("confirmPassword")}>
                          <ClearIcon />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password Feedback */}
              {formData.confirmPassword && (
                <div
                  style={{
                    ...styles.tooltipBox,
                    color: formData.confirmPassword === formData.password ? "green" : "red",
                  }}
                >
                  {formData.confirmPassword === formData.password
                    ? "Password matches"
                    : "Passwords do not match"}
                </div>
              )}

              <div style={styles.buttonGroup}>
                <Button type="submit" variant="contained" style={styles.sendResetBtn} fullWidth>
                  Reset Password
                </Button>
                <Button variant="outlined" style={styles.backSignInBtn} onClick={handleSignIn} fullWidth>
                  Sign In
                </Button>
              </div>
            </form>

            <p style={styles.footer}>© 2025 M.A.C.B., Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}