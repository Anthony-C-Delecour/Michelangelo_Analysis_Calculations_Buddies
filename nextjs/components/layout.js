import React, { useState, useEffect } from 'react';

// This is a placeholder for your actual navigation bar component.
// In your real project, this would be imported from its own file.
const NavigationLayout = () => {
    return (
        <header style={{
            height: '4rem',
            // I've updated the background color to match the logo's border
            backgroundColor: '#3A6A3B',
        }}>
            {/* This is the top navigation bar area */}
        </header>
    );
};

export default function Layout({ children }) {
    const [pathname, setPathname] = useState('');

    // This useEffect hook runs only on the client-side (in the browser),
    // which prevents the "window is not defined" error during server-side rendering.
    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    // Define the paths where the navigation should not be displayed.
    // I have removed '/registration_page' from this list.
    const noNavPaths = ['/login_page'];

    // Check if the current path is one where the nav should be hidden
    if (noNavPaths.includes(pathname)) {
        // If so, just render the page's content without the navigation bar
        return <main>{children}</main>;
    }
    
    // While the client is determining the path, we can render the content
    // to prevent a flash of the navigation bar. Or just render the children.
    if (!pathname) {
        return <main>{children}</main>;
    }

    // Otherwise, render the page with the full navigation layout
    return (
        <>
            <NavigationLayout />
            <main>{children}</main>
        </>
    );
}

  