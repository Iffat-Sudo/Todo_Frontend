import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, isLoading, user, hasRole } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If requiredRoles is empty, allow access to authenticated users
    if (requiredRoles.length === 0) {
        return children;
    }

    // Check if user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role => hasRole(role));

    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleProtectedRoute;