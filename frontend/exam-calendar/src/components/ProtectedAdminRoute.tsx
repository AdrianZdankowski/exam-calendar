import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
};

const ProtectedAdminRoute = ({ children } : ProtectedRouteProps) => {
    const { isAuthenticated, isRefreshing, userRole } = useAuth();

    if (isRefreshing) return null;

    if (!isAuthenticated) return <Navigate to="/login" replace/>;
    
    // Change to Unauthorized component
    if (userRole !== "Admin") return <Navigate to="/register" replace/>;

    return <>{children}</>
}

export default ProtectedAdminRoute;