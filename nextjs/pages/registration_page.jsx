import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff, Clear } from "@mui/icons-material";
import styles from "../styles/registrationpage.module.css"; 

function NavigationLayout() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 80, backgroundColor: "#3A6A3B", color: "white" }}>
      <h1>M.A.C.B.</h1>
    </div>
  );
}

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const clearField = (fieldName) => {
    setFormData({ ...formData, [fieldName]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      console.error("Please accept the Terms and Conditions to proceed.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    console.log("Registration successful:", formData);
    window.location.href = "/dashboard_page";
  };

  const handleSignIn = () => {
    window.location.href = "/login_page";
  };

  return (
    <>
      <NavigationLayout />
      <div className={styles.pageContainer}>
        <div className={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Registration.png"
            alt="Team working on analytics"
            className={styles.illustration}
          />
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.card}>
            <div className={styles.brandingHeader}>
              <img
                src="/images/MACB_logo.png"
                alt="M.A.C.B. Logo"
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <h1 className={styles.acronym}>M.A.C.B.</h1>
            </div>

            <p className={styles.welcomeText}>
              Welcome to Michelangelo Analysis Calculations Buddies!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Username */}
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  endAdornment: formData.username && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => clearField("username")}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email */}
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  endAdornment: formData.email && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => clearField("email")}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
                          <Clear />
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
                <div className={styles.tooltipBox}>
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
                          <Clear />
                        </IconButton>
                      )}
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password Feedback */}
              {formData.confirmPassword && (
                <div
                  className={styles.tooltipBox}
                  style={{ color: formData.confirmPassword === formData.password ? "green" : "red" }}
                >
                  {formData.confirmPassword === formData.password
                    ? "Password matches"
                    : "Passwords do not match"}
                </div>
              )}

              <div className={styles.buttonGroup}>
                <Button type="submit" variant="contained" className={styles.registerBtn} fullWidth>
                  Register
                </Button>
                <Button variant="outlined" className={styles.signInBtn} onClick={handleSignIn} fullWidth>
                  Sign In
                </Button>
              </div>

              <FormControlLabel
                className={styles.terms}
                control={
                  <Checkbox
                    checked={formData.agree}
                    onChange={handleChange}
                    name="agree"
                    sx={{ "&.Mui-checked": { color: "#3A6A3B" } }}
                  />
                }
                label="I accept the Terms and Conditions"
              />
            </form>

            <p className={styles.footer}>© 2025 M.A.C.B., Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}