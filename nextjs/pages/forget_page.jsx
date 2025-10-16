import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "../styles/forgetpage.module.css"; 

function NavigationLayout() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 80, backgroundColor: "#3A6A3B", color: "white" }}>
      <h1>M.A.C.B.</h1>
    </div>
  );
}

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => setEmail(e.target.value);
  const clearField = () => setEmail("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password requested for:", email);
    alert("A password reset link has been sent to your email.");
  };
  const handleSignIn = () => (window.location.href = "/login_page");

  return (
    <>
      <NavigationLayout />
      <div className={styles.pageContainer}>
        <div className={styles.leftPanel}>
          <img
            src="/images/Michelangelo_Forget.png"
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
                className={styles.logo}
              />
              <h1 className={styles.acronym}>M.A.C.B.</h1>
            </div>

            <p className={styles.welcomeText}>
              Please enter your email to reset your account password.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
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

              <div className={styles.buttonGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.sendResetBtn}
                  fullWidth
                >
                  Send Reset Link
                </Button>
                <Button
                  variant="outlined"
                  className={styles.backSignInBtn}
                  onClick={handleSignIn}
                  fullWidth
                >
                  Back to Sign In
                </Button>
              </div>
            </form>

            <p className={styles.footer}>
              © 2025 M.A.C.B., Inc. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}