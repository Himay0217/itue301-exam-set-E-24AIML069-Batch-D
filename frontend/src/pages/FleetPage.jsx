import VehicleCard from '../components/VehicleCard';

/**
 * Mock vehicle data.
 * This will be replaced with real API data in a later task.
 */
const mockVehicles = [
  { id: 1, model: 'Toyota Camry', type: 'Sedan', pricePerDay: 55, available: true },
  { id: 2, model: 'Ford Mustang', type: 'Coupe', pricePerDay: 95, available: true },
  { id: 3, model: 'BMW 3 Series', type: 'Sedan', pricePerDay: 120, available: false },
  { id: 4, model: 'Tesla Model 3', type: 'Electric', pricePerDay: 110, available: true },
  { id: 5, model: 'Honda Civic', type: 'Sedan', pricePerDay: 45, available: false },
  { id: 6, model: 'Chevrolet Malibu', type: 'Sedan', pricePerDay: 50, available: true },
];

/**
 * FleetPage
 *
 * Renders the full car fleet by mapping over vehicle data and
 * passing each entry as props to VehicleCard.
 */
const FleetPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Available Fleet</h1>
      <p style={styles.sub}>Browse our vehicles and book your next ride</p>

      <div style={styles.grid}>
        {mockVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            model={vehicle.model}
            type={vehicle.type}
            pricePerDay={vehicle.pricePerDay}
            available={vehicle.available}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '1000px',
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
    flexWrap: 'wrap',
    gap: '20px',
  },
};

export default FleetPage;
