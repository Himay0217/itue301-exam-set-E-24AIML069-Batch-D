/**
 * MyBookingsPage
 *
 * Displays the authenticated user's booking history.
 * Data fetching logic will be added in a later task.
 */
const MyBookingsPage = () => {
  // Placeholder — will be populated from API in a later task
  const bookings = [];

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>My Bookings</h1>
      <p style={styles.sub}>View all your current and past rentals</p>

      {bookings.length === 0 ? (
        <div style={styles.empty}>
          <p>You have no bookings yet.</p>
          <a href="/" style={styles.link}>
            Browse the fleet
          </a>
        </div>
      ) : (
        <ul style={styles.list}>
          {bookings.map((booking) => (
            <li key={booking._id} style={styles.item}>
              <strong>{booking.car?.model}</strong>
              <span>
                {booking.startDate} – {booking.endDate}
              </span>
              <span>Total: ${booking.totalPrice}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  heading: {
    margin: '0 0 4px',
    fontSize: '1.8rem',
  },
  sub: {
    margin: '0 0 24px',
    color: '#666',
    fontSize: '0.95rem',
  },
  empty: {
    padding: '32px',
    textAlign: 'center',
    color: '#555',
    border: '1px dashed #ccc',
    borderRadius: '8px',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
};

export default MyBookingsPage;
