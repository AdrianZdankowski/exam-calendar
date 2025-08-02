import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
};

const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
    const { isAuthenticated, isRefreshing } = useAuth();

    if (!isRefreshing) return null;

    return isAuthenticated ? <>{children}</> : <Navigate to="/login"/>;
}

export default ProtectedRoute;