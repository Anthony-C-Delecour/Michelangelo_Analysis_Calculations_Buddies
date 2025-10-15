import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

// Navigation Bar Component
function NavigationLayout() {
    const navStyles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            height: '80px',
            backgroundColor: '#3A6A3B',
            color: 'white',
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
        },
        logoText: {
            fontWeight: 500,
            fontSize: '1.2rem',
            margin: 0,
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 80, backgroundColor: "#3A6A3B", color: "white" }}>
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
    maxWidth: "420px",
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
  footer: {
    marginTop: "2rem",
    color: "#adb5bd",
    fontSize: "0.8rem",
  },
};

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const clearField = () => {
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password requested for:", email);
    alert("A password reset link has been sent to your email.");
  };

  const handleSignIn = () => {
    window.location.href = "/login_page";
  };

  return (
    <React.Fragment>
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

            <p style={styles.welcomeText}>
              Please enter your email to reset your account password.
            </p>

            <form style={styles.form} onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: email && (
                    <InputAdornment position="end">
                      <IconButton onClick={clearField} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div style={styles.buttonGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  style={styles.sendResetBtn}
                  fullWidth
                >
                  Send Reset Link
                </Button>
                <Button
                  variant="outlined"
                  style={styles.backSignInBtn}
                  onClick={handleSignIn}
                  fullWidth
                >
                  Back to Sign In
                </Button>
              </div>
            </form>

            <p style={styles.footer}>
              © 2025 M.A.C.B., Inc. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
