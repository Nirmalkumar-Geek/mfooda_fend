import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Using Navigate for redirects
import { useAuth } from "../../Contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/signin" replace />;
    }

    // Render the protected component if authenticated
    return children || <Outlet />;
};

export default PrivateRoute;
