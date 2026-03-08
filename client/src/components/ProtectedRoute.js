import { Navigate } from 'react-router-dom';

// role may be undefined or string or array
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  if (!token) return <Navigate to="/login" replace />;
  if (role && user && role !== user.role && !(Array.isArray(role) && role.includes(user.role))) {
    return <Navigate to="/" replace />;
  }
  return children;
}
