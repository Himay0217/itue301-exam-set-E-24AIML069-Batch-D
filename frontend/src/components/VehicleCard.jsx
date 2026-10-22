/**
 * VehicleCard
 *
 * Props:
 *   model      {string}  - Vehicle model name
 *   type       {string}  - Vehicle type (e.g. Sedan, SUV)
 *   pricePerDay {number} - Daily rental price in USD
 *   available  {boolean} - Whether the car can be booked right now
 */
const VehicleCard = ({ model, type, pricePerDay, available }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.model}>{model}</h3>
      <p style={styles.detail}>
        <span style={styles.label}>Type:</span> {type}
      </p>
      <p style={styles.detail}>
        <span style={styles.label}>Price:</span> ${pricePerDay} / day
      </p>
      <p style={styles.detail}>
        <span style={styles.label}>Status:</span>{' '}
        <span style={available ? styles.available : styles.unavailable}>
          {available ? 'Available' : 'Not Available'}
        </span>
      </p>

      {/* Ternary: Book Now button when available, badge when not */}
      {available ? (
        <button style={styles.bookBtn}>Book Now</button>
      ) : (
        <span style={styles.badge}>Not Available</span>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '240px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  model: {
    margin: 0,
    fontSize: '1.1rem',
  },
  detail: {
    margin: 0,
    fontSize: '0.9rem',
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
  },
  available: {
    color: '#2a9d3f',
  },
  unavailable: {
    color: '#c0392b',
  },
  bookBtn: {
    marginTop: '8px',
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  badge: {
    marginTop: '8px',
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#f1f1f1',
    color: '#c0392b',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
};

export default VehicleCard;
