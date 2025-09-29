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
            <div style={navStyles.logoContainer}>
            </div>
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
        username: "",
        email: "",
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
        
        // Check if the user has agreed to the terms and conditions
        if (!formData.agree) {
            console.error("Please accept the Terms and Conditions to proceed.");
            // You could also set an error state here to display a message to the user
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match!");
            // You could also set an error state here to display a message to the user
            return;
        }

        // If all checks pass, log the data and navigate
        console.log("Registration successful:", formData);
        
        // TODO: Implement actual registration logic (e.g., send data to an API)
        
        // Navigate to the dashboard page upon successful registration
        window.location.href = "/dashboard_page"; // Replaced router.push
    };

    const handleSignIn = () => {
        window.location.href = "/login_page"; // Replaced router.push
    };

    return (
        <React.Fragment>
            <NavigationLayout />
            <div style={styles.pageContainer}>
                {/* Left Panel with Illustration */}
                <div style={styles.leftPanel}>
                    {/* Replaced Next.js Image with standard img tag */}
                    <img
                        src="/images/Michelangelo_Welcome.png"
                        alt="Team working on analytics"
                        style={styles.illustration}
                    />
                </div>

                {/* Right Panel with Form */}
                <div style={styles.rightPanel}>
                    <div style={styles.card}>
                        <div style={styles.brandingHeader}>
                            {/* Replaced Next.js Image with standard img tag */}
                            <img
                                src="/images/MACB_logo.png"
                                alt="M.A.C.B. Logo"
                                style={{ width: 80, height: 80, objectFit: 'contain' }}
                            />
                            {/* The H1 tag for the acronym is now back in place */}
                            <h1 style={styles.acronym}>M.A.C.B.</h1>
                        </div>

                        <p style={styles.welcomeText}>
                            Welcome to Michelangelo Analysis Calculations Buddies!
                        </p>

                        <form style={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                name="username"
                                variant="outlined"
                                fullWidth
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
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
                                    Register
                                </Button>
                                <Button variant="outlined" style={styles.signInBtn} onClick={handleSignIn} fullWidth>
                                    Sign In
                                </Button>
                            </div>

                            <FormControlLabel
                                style={styles.terms}
                                control={
                                    <Checkbox
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        name="agree"
                                        sx={{ '&.Mui-checked': { color: '#3A6A3B' } }}
                                    />
                                }
                                label="I accept the Terms and Conditions"
                            />
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