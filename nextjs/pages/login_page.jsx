import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "../styles/loginpage.module.css"; 

function NavigationLayout() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 80, backgroundColor: "#3A6A3B", color: "white" }}>
      <h1>M.A.C.B.</h1>
    </div>
  );
}

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
      <div className={styles.pageContainer}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Welcome.png"
            alt="Team working on analytics"
            className={styles.illustration}
          />
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.card}>
            <div className={styles.brandingHeader}>
              <img
                src="/images/MACB_logo.png"
                alt="M.A.C.B. Logo"
                className={styles.logo}
              />
              <h1 className={styles.acronym}>M.A.C.B.</h1>
            </div>

            <p className={styles.welcomeText}>
              Welcome Back to Michelangelo Analysis Calculation Buddies!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* EMAIL FIELD */}
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

              {/* PASSWORD FIELD */}
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
              <div className={styles.buttonGroup}>
                <Button type="submit" variant="contained" className={styles.signInBtn} fullWidth>
                  Sign In
                </Button>
                <Button variant="outlined" className={styles.registerBtn} onClick={handleRegister} fullWidth>
                  Register
                </Button>
              </div>

              {/* FORGOT PASSWORD */}
              <Link
                href="/forget_page"
                className={styles.forgotPassword}
                underline="hover"
              >
                Forgot Password?
              </Link>

              {/* DIVIDER */}
              <div className={styles.divider}>
                <hr />
                <span>OR</span>
                <hr />
              </div>

              {/* GOOGLE SIGN IN */}
              <Button variant="outlined" className={styles.googleBtn} fullWidth>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google icon"
                  className={styles.googleIcon}
                />
                Continue with Google
              </Button>
            </form>

            <p className={styles.footer}>© 2025 M.A.C.B., Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}