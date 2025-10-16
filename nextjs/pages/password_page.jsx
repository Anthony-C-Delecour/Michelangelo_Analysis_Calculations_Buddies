import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link"; 
import styles from "../styles/password.module.css";

function NavigationLayout() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 80, backgroundColor: "#3A6A3B", color: "white" }}>
      <h1>M.A.C.B.</h1>
    </div>
  );
}

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
      <div className={styles.pageContainer}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Reset.png"
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

            <p className={styles.welcomeText}>Please reset your account password.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
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
                <div className={styles.tooltipBox}>
                  <p className={formData.password.length >= 8 ? styles.valid : styles.invalid}>
                    • At least 8 characters
                  </p>
                  <p className={/[A-Z]/.test(formData.password) ? styles.valid : styles.invalid}>
                    • At least 1 uppercase letter
                  </p>
                  <p className={/\d/.test(formData.password) ? styles.valid : styles.invalid}>
                    • At least 1 number
                  </p>
                  <p className={/[!@#$%^&*]/.test(formData.password) ? styles.valid : styles.invalid}>
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
                  className={`${styles.tooltipBox} ${
                    formData.confirmPassword === formData.password
                      ? styles.validText
                      : styles.invalidText
                  }`}
                >
                  {formData.confirmPassword === formData.password
                    ? "Password matches"
                    : "Passwords do not match"}
                </div>
              )}

              {/* Reset Button */}
              <div className={styles.buttonGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.sendResetBtn}
                  fullWidth
                >
                  Reset Password
                </Button>
              </div>

              {/* Back to Sign In Link */}
              <Link
                onClick={handleSignIn}
                className={styles.backSignIn}
                underline="none"
              >
                Back to Sign In
              </Link>
            </form>

            <p className={styles.footer}>© 2025 M.A.C.B., Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
