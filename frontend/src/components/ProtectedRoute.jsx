import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 *
 * Renders its children when a token is present in AuthContext.
 * If there is no token the user is redirected to "/" (LoginPage) immediately.
 *
 * Usage:
 *   <Route path="/fleet" element={<ProtectedRoute><FleetPage /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
