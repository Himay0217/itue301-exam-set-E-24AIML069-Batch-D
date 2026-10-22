import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar
 *
 * Renders React Router <Link>s for client-side navigation (no full-page reload).
 * Shows a Logout button when the customer is logged in.
 */
const Navbar = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>
          DriveEasy
        </Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/fleet" style={styles.link}>
          Fleet
        </Link>
        <Link to="/my-bookings" style={styles.link}>
          My Bookings
        </Link>
        <Link to="/admin" style={styles.link}>
          Admin
        </Link>
      </div>

      <div style={styles.auth}>
        {customer ? (
          <>
            <span style={styles.greeting}>Hi, {customer.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: '#1e293b',
    color: '#fff',
  },
  brand: {
    flexShrink: 0,
  },
  brandLink: {
    color: '#60a5fa',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  greeting: {
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
  logoutBtn: {
    padding: '6px 14px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};

export default Navbar;
