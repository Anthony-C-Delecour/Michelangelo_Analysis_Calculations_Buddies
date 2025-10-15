import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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
        <div style={navStyles.container}>
            <div style={navStyles.logoContainer}></div>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        minHeight: 'calc(100vh - 80px)',
        width: '100%',
        backgroundColor: '#f8f9fa',
    },
    leftPanel: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: 'white',
    },
    illustration: {
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '80vh',
    },
    rightPanel: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
    },
    card: {
        background: 'white',
        padding: '2.5rem 3rem',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '480px',
        textAlign: 'center',
    },
    brandingHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '0.5rem',
    },
    acronym: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#212529',
        margin: 0,
    },
    welcomeText: {
        color: '#6c757d',
        marginBottom: '2rem',
        fontSize: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginTop: '0.5rem',
    },
    registerBtn: {
        backgroundColor: '#3A6A3B',
        color: 'white',
        padding: '12px 0',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '8px',
    },
    signInBtn: {
        borderColor: '#3A6A3B',
        color: '#3A6A3B',
        padding: '12px 0',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '8px',
    },
    terms: {
        justifyContent: 'center',
        color: '#6c757d',
    },
    footer: {
        marginTop: '2rem',
        color: '#adb5bd',
        fontSize: '0.8rem',
    }
};

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userOrEmail: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match!");
            return;
        }
        console.log("Password reset successful:", formData);
        alert("Your password has been reset successfully! You can now sign in.");
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
                                style={{ width: 80, height: 80, objectFit: 'contain' }}
                            />
                            <h1 style={styles.acronym}>M.A.C.B.</h1>
                        </div>

                        <p style={styles.welcomeText}>
                            Please Reset Your Account Password.
                        </p>

                        <form style={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                label="Username or Email"
                                name="userOrEmail"
                                variant="outlined"
                                fullWidth
                                value={formData.userOrEmail}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <div style={styles.buttonGroup}>
                                <Button type="submit" variant="contained" style={styles.registerBtn} fullWidth>
                                    Reset Password
                                </Button>
                                <Button variant="outlined" style={styles.signInBtn} onClick={handleSignIn} fullWidth>
                                    Sign In
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
