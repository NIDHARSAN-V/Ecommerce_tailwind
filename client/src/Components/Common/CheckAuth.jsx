import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // 🔹 Redirect unauthenticated users to login
    if (!isAuthenticated && !location.pathname.includes('/auth')) {
        return <Navigate to="/auth/login" />;
    }

    // 🔹 Prevent authenticated users from accessing login/register
    if (isAuthenticated && (location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))) {
        return user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
    }

    // 🔹 Prevent non-admin users from accessing admin routes
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes('/admin')) {
        return <Navigate to="/unauth-page" />;
    }

    // 🔹 Prevent admin users from accessing shopping routes
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes('/shop')) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
