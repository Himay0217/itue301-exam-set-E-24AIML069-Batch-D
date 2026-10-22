/**
 * AdminPanel (lazy-loaded)
 *
 * Placeholder admin dashboard — feature implementation to follow.
 */
const AdminPanel = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Admin Panel</h1>
      <p style={styles.sub}>Manage the fleet, bookings, and customers from here.</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Fleet</h3>
          <p>Add, edit, or remove vehicles from the rental catalogue.</p>
        </div>
        <div style={styles.card}>
          <h3>Bookings</h3>
          <p>View and manage all active and past reservations.</p>
        </div>
        <div style={styles.card}>
          <h3>Customers</h3>
          <p>Browse registered customer accounts.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  heading: {
    margin: '0 0 4px',
    fontSize: '1.8rem',
  },
  sub: {
    margin: '0 0 28px',
    color: '#666',
    fontSize: '0.95rem',
  },
  grid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    flex: '1 1 240px',
    backgroundColor: '#fafafa',
  },
};

export default AdminPanel;
