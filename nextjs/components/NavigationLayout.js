import React from 'react';

export default function NavigationLayout() {
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
    };

    return (
        <div style={navStyles.container}>
            <div style={navStyles.logoContainer}>
                {}
            </div>
        </div>
    );
}