import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Navigation Bar Component
function NavigationLayout() {
  const navStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      height: "80px",
      backgroundColor: "#3A6A3B",
      color: "white",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    logoText: {
      fontWeight: 500,
      fontSize: "1.2rem",
      margin: 0,
    },
  };

  return (
    <div style={navStyles.container}>
      <div style={navStyles.logoContainer}></div>
    </div>
  );
}

// Styles for the page
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
    padding: "2.5rem 3rem",
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
    marginBottom: "0.5rem",
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
    marginTop: "0.5rem",
  },
  signInBtn: {
    backgroundColor: "#3A6A3B",
    color: "white",
    padding: "12px 0",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "8px",
  },
  registerBtn: {
    borderColor: "#3A6A3B",
    color: "#3A6A3B",
    padding: "12px 0",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "8px",
  },
  forgotPassword: {
    color: "#3A6A3B",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    display: "inline-block",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#adb5bd",
    margin: "1.5rem 0",
  },
  googleBtn: {
    borderColor: "#ced4da",
    color: "#495057",
    padding: "12px 0",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "1rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  footer: {
    marginTop: "2rem",
    color: "#adb5bd",
    fontSize: "0.8rem",
  },
};

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearField = (field) => {
    setFormData({ ...formData, [field]: "" });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login_page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Login successful!");
        window.location.href = "/dashboard_page";
      } else {
        console.error(`Login failed: ${data.detail}`);
      }
    } catch (err) {
      console.error("Server error.", err);
    }
  };

  const handleRegister = () => {
    window.location.href = "/registration_page";
  };

  return (
    <div>
      <NavigationLayout />
      <div style={styles.pageContainer}>
        <div style={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Welcome.png"
            alt="Team working on analytics"
            style={styles.illustration}
          />
        </div>
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
              Welcome Back to Michelangelo Analysis Calculation Buddies!
            </p>
            <form style={styles.form} onSubmit={handleSubmit}>
              {/* EMAIL FIELD with X CLEAR BUTTON */}
              <TextField
                label="Username or Email"
                name="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: formData.email && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => clearField("email")}
                        edge="end"
                        aria-label="clear email"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* PASSWORD FIELD with EYE and X BUTTONS */}
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formData.password && (
                        <IconButton
                          onClick={() => clearField("password")}
                          edge="end"
                          aria-label="clear password"
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* BUTTONS */}
              <div style={styles.buttonGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  style={styles.signInBtn}
                  fullWidth
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  style={styles.registerBtn}
                  onClick={handleRegister}
                  fullWidth
                >
                  Register
                </Button>
              </div>

              {/* FORGOT PASSWORD LINK */}
              <Link
                href="/forget_page"
                sx={{
                  ...styles.forgotPassword,
                  textDecoration: "none",
                  "&:hover > span": { textDecoration: "underline" },
                }}
              >
                <span>Forgot Password</span>?
              </Link>

              {/* DIVIDER */}
              <div style={styles.divider}>
                <hr style={{ flex: 1, borderColor: "#dee2e6" }} />
                <span style={{ padding: "0 1rem" }}>OR</span>
                <hr style={{ flex: 1, borderColor: "#dee2e6" }} />
              </div>

              {/* GOOGLE SIGN IN */}
              <Button variant="outlined" style={styles.googleBtn} fullWidth>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google icon"
                  style={{ width: "18px", height: "18px" }}
                />
                Continue with Google
              </Button>
            </form>
            <p style={styles.footer}>© 2025 M.A.C.B., Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}